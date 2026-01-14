import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const orderId = getEnv("DEMO_ORDER_ID", "<ORDER_ID>");
  const email = getEnv("DEMO_EMAIL", "user@example.com");

  const res = await client.callTool("getOrder", { orderId, email });
  console.log(JSON.stringify(res, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
