import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const sku = getEnv("DEMO_SKU", "100080");
  const country = getEnv("DEMO_COUNTRY", "DE");

  // 1) Create/update cart
  const addRes = await client.callTool("addToCart", {
    add: [{ sku, quantity: 1 }],
    country
  });
  console.log("addToCart:\n", JSON.stringify(addRes, null, 2));

  // NOTE: set DEMO_CART_ID from addRes output if your API returns it.
  const cartId = getEnv("DEMO_CART_ID", "<CART_ID>");

  // 2) Get cart
  const cartRes = await client.callTool("getCart", { cartId });
  console.log("\ngetCart:\n", JSON.stringify(cartRes, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
