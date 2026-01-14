import { createClient } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const res = await client.callTool("getFlowGraph", { flowType: "all" });
  console.log(JSON.stringify(res, null, 2));
  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
