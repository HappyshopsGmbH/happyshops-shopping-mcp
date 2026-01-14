import json
from client import McpSseClient, env

def main():
    c = McpSseClient(env("MCP_BASE_URL"))
    res = c.call_tool("getFlowGraph", {"flowType": "all"})
    print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
