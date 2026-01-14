import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const email = getEnv("DEMO_EMAIL", "user@example.com");

  const code = process.env.DEMO_CODE;
  const authKey = process.env.DEMO_AUTH_KEY;

  if (!code && !authKey) {
    const step1 = await client.callTool("getAuthKey", { email });
    console.log(JSON.stringify(step1, null, 2));
    console.log("\nSet DEMO_CODE (valid ~10 minutes) and rerun.");
    client.close();
    return;
  }

  if (!authKey && code) {
    const step2 = await client.callTool("getAuthKey", { email, code });
    console.log(JSON.stringify(step2, null, 2));
    console.log("\nSet DEMO_AUTH_KEY from response and rerun to call getUser.");
    client.close();
    return;
  }

  const userRes = await client.callTool("getUser", { email, authKey });
  console.log(JSON.stringify(userRes, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
