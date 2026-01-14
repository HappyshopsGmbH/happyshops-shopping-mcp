import { createClient, getEnv } from "./_mcp_sse_client.js";

async function main() {
  const client = createClient();
  const searchPhrase = getEnv("DEMO_SEARCH_PHRASE", "Ravensburger");

  const res = await client.callTool("searchProduct", { searchPhrase, limit: 20, page: 1 });
  console.log(JSON.stringify(res, null, 2));

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
