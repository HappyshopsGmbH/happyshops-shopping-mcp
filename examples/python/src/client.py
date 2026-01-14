import json
import os
import time
import uuid
import requests
from dotenv import load_dotenv
from sseclient import SSEClient

load_dotenv()

def env(name: str, fallback: str | None = None) -> str:
    v = os.getenv(name, fallback)
    if v is None:
        raise RuntimeError(f"Missing env var: {name}")
    return v

class McpSseClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")
        self.message_endpoint: str | None = None
        self._sse = None

    def connect(self, timeout_sec: int = 5):
        # SSE connect to base URL
        headers = {"Accept": "text/event-stream"}
        self._sse = SSEClient(self.base_url, headers=headers)

        # Wait briefly for endpoint event
        start = time.time()
        for event in self._sse.events():
            # Typical: event.event == "endpoint" and event.data is JSON with url
            if event.event in ("endpoint", "message"):
                endpoint = self._extract_endpoint(event)
                if endpoint:
                    self.message_endpoint = endpoint
                    break
            if time.time() - start > timeout_sec:
                break

    def _extract_endpoint(self, event) -> str | None:
        data = (event.data or "").strip()
        if not data:
            return None
        try:
            obj = json.loads(data)
            if isinstance(obj, dict):
                if isinstance(obj.get("url"), str):
                    return obj["url"]
                if isinstance(obj.get("endpoint"), str):
                    return obj["endpoint"]
        except Exception:
            if data.startswith("http"):
                return data
        return None

    def _post_rpc(self, req: dict, timeout_sec: int = 30):
        url = self.message_endpoint or self.base_url
        r = requests.post(url, json=req, timeout=timeout_sec)
        # Some servers respond sync with JSON
        if "application/json" in (r.headers.get("content-type") or ""):
            return r.json()
        return None

    def rpc(self, method: str, params: dict | None = None, timeout_sec: int = 30):
        if not self._sse:
            self.connect()

        req_id = f"rpc_{uuid.uuid4().hex}"
        req = {"jsonrpc": "2.0", "id": req_id, "method": method}
        if params is not None:
            req["params"] = params

        sync_resp = self._post_rpc(req, timeout_sec=timeout_sec)
        if sync_resp and sync_resp.get("id") == req_id:
            if "error" in sync_resp:
                raise RuntimeError(sync_resp["error"])
            return sync_resp.get("result")

        # Otherwise wait on SSE for matching id
        start = time.time()
        for event in self._sse.events():
            try:
                msg = json.loads((event.data or "").strip())
            except Exception:
                continue
            if isinstance(msg, dict) and msg.get("id") == req_id:
                if msg.get("error"):
                    raise RuntimeError(msg["error"])
                return msg.get("result")
            if time.time() - start > timeout_sec:
                raise TimeoutError(f"Timeout waiting for response id={req_id}")

    def list_tools(self):
        return self.rpc("tools/list")

    def call_tool(self, name: str, arguments: dict):
        return self.rpc("tools/call", {"name": name, "arguments": arguments})
