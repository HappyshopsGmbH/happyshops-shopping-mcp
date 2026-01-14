import json
from client import McpSseClient, env

def main():
    search_phrase = env("DEMO_SEARCH_PHRASE", "Ravensburger")
    c = McpSseClient(env("MCP_BASE_URL"))
    res = c.call_tool("searchProduct", {"searchPhrase": search_phrase, "limit": 20, "page": 1})
    print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
