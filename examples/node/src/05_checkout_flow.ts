import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();

  const cartId = getEnv("DEMO_CART_ID", "<CART_ID>");
  const email = getEnv("DEMO_EMAIL", "user@example.com");
  const paymentMethod = getEnv("DEMO_PAYMENT_METHOD", "paypal");

  const billingAddress = {
    firstName: "Max",
    lastName: "Mustermann",
    streetName: "Musterstrasse",
    houseNumber: "1",
    postalCode: "12345",
    city: "Berlin",
    country: "DE",
    email
  };

  const res = await client.callTool("createOrder", {
    paymentMethod,
    cartId,
    billingAddress
  });

  console.log(JSON.stringify(res, null, 2));
  console.log("\nIMPORTANT: Always show the external payment link returned by createOrder.");

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
