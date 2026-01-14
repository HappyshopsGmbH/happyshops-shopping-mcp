import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const orderId = getEnv("DEMO_ORDER_ID", "<ORDER_ID>");
  const email = getEnv("DEMO_EMAIL", "user@example.com");

  console.log("WARNING: cancelOrder changes state. Only run this with explicit user confirmation.");

  const res = await client.callTool("cancelOrder", { orderId, email });
  console.log(JSON.stringify(res, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
