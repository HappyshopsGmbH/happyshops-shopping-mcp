import "dotenv/config";
import EventSource from "eventsource";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params?: any;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: string;
  result?: any;
  error?: { code?: number; message: string; data?: any };
};

function env(name: string, fallback?: string): string {
  const v = process.env[name] ?? fallback;
  if (v === undefined) throw new Error(`Missing env var: ${name}`);
  return v;
}

function randomId(prefix = "req"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/**
 * Extract the "message endpoint" from SSE.
 * Many MCP remote servers send something like:
 * event: endpoint
 * data: {"url":"https://.../message?sessionId=..."}
 *
 * If your server sends a different shape, adapt this function.
 */
function extractMessageEndpoint(ev: MessageEvent): string | null {
  // 1) If server uses event name "endpoint"
  if (ev.type === "endpoint") {
    try {
      const data = JSON.parse(String(ev.data));
      if (typeof data?.url === "string") return data.url;
      if (typeof data?.endpoint === "string") return data.endpoint;
    } catch {
      // Sometimes plain string URL
      const s = String(ev.data).trim();
      if (s.startsWith("http")) return s;
    }
  }

  // 2) Some servers might send endpoint info as a normal "message"
  if (ev.type === "message") {
    const s = String(ev.data).trim();
    // Try JSON parse and look for url
    try {
      const data = JSON.parse(s);
      if (typeof data?.url === "string") return data.url;
      if (typeof data?.endpoint === "string") return data.endpoint;
    } catch {
      // ignore
    }
  }

  return null;
}

export class McpSseClient {
  private baseUrl: string;
  private es?: EventSource;
  private messageEndpoint?: string;

  private pending = new Map<
    string,
    { resolve: (v: any) => void; reject: (e: any) => void; timeout: NodeJS.Timeout }
  >();

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async connect(): Promise<void> {
    if (this.es) return;

    const sseUrl = this.baseUrl; // user confirmed base URL is used directly
    this.es = new EventSource(sseUrl, {
      headers: { Accept: "text/event-stream" }
    } as any);

    await new Promise<void>((resolve, reject) => {
      const onOpen = () => resolve();
      const onError = (err: any) => reject(err);

      this.es!.addEventListener("open", onOpen);
      this.es!.addEventListener("error", onError);

      setTimeout(() => {
        // if no open event, still might be okay; don't hard fail
        resolve();
      }, 3000);
    });

    // Listen for endpoint announcements
    const endpointHandler = (ev: MessageEvent) => {
      const url = extractMessageEndpoint(ev);
      if (url && !this.messageEndpoint) {
        this.messageEndpoint = url;
      }
    };

    // Listen for responses (JSON-RPC)
    const messageHandler = (ev: MessageEvent) => {
      const raw = String(ev.data);
      let msg: any;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }

      // If the server emits endpoint in generic messages
      const maybeEndpoint = extractMessageEndpoint(ev);
      if (maybeEndpoint && !this.messageEndpoint) {
        this.messageEndpoint = maybeEndpoint;
        return;
      }

      const resp = msg as JsonRpcResponse;
      if (!resp?.id) return;

      const pending = this.pending.get(resp.id);
      if (!pending) return;

      clearTimeout(pending.timeout);
      this.pending.delete(resp.id);

      if (resp.error) pending.reject(resp.error);
      else pending.resolve(resp.result);
    };

    // Try common event types
    this.es.addEventListener("endpoint", endpointHandler as any);
    this.es.addEventListener("message", messageHandler as any);
    this.es.addEventListener("response", messageHandler as any);
  }

  close(): void {
    if (this.es) this.es.close();
    this.es = undefined;
  }

  private async ensureMessageEndpoint(): Promise<string> {
    if (this.messageEndpoint) return this.messageEndpoint;

    // Wait a bit for endpoint event
    const start = Date.now();
    while (!this.messageEndpoint && Date.now() - start < 5000) {
      await new Promise((r) => setTimeout(r, 50));
    }

    if (!this.messageEndpoint) {
      // Fallback: some servers accept POST directly to base URL
      return this.baseUrl;
    }
    return this.messageEndpoint;
  }

  async rpc(method: string, params?: any, timeoutMs = 30_000): Promise<any> {
    await this.connect();
    const url = await this.ensureMessageEndpoint();

    const id = randomId("rpc");
    const req: JsonRpcRequest = { jsonrpc: "2.0", id, method, params };

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);

    const promise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timeout waiting for JSON-RPC response for id=${id}`));
      }, timeoutMs);

      this.pending.set(id, { resolve, reject, timeout });
    });

    // Send JSON-RPC request
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
      signal: controller.signal
    }).catch((e) => {
      clearTimeout(t);
      throw e;
    });

    clearTimeout(t);

    // Some servers reply synchronously to POST (instead of via SSE)
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const json = (await res.json()) as JsonRpcResponse;
      if (json?.id === id) {
        // resolve/reject immediately
        this.pending.delete(id);
        if (json.error) throw json.error;
        return json.result;
      }
    }

    // Otherwise, wait for SSE response
    return await promise;
  }

  // MCP convenience wrappers (common methods)
  async listTools(): Promise<any> {
    // Many MCP servers expose tools via "tools/list"
    return this.rpc("tools/list");
  }

  async callTool(name: string, args: Record<string, any>): Promise<any> {
    // Many MCP servers expose tool calls via "tools/call"
    return this.rpc("tools/call", { name, arguments: args });
  }
}

export function createClient(): McpSseClient {
  return new McpSseClient(env("MCP_BASE_URL"));
}

export function getEnv(name: string, fallback?: string): string {
  return env(name, fallback);
}
