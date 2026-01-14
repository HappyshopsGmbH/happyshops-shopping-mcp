import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const sku = getEnv("DEMO_SKU", "100080");

  const res = await client.callTool("getProduct", { sku, imagesAsUrlOnly: true });
  console.log(JSON.stringify(res, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
