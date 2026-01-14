import { createClient } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  await client.connect();

  console.log("Connected via SSE.");

  // Show tools (helps validate transport quickly)
  const tools = await client.listTools();
  console.log("\nTools:\n", JSON.stringify(tools, null, 2));

  client.close();
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
