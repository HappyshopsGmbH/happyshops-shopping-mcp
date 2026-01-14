import json
from client import McpSseClient, env

def main():
    c = McpSseClient(env("MCP_BASE_URL"))
    c.connect()
    print("Connected via SSE.")
    tools = c.list_tools()
    print(json.dumps(tools, indent=2))

if __name__ == "__main__":
    main()
