import json
from client import McpSseClient, env

def main():
    sku = env("DEMO_SKU", "100080")
    c = McpSseClient(env("MCP_BASE_URL"))
    res = c.call_tool("getProduct", {"sku": sku, "imagesAsUrlOnly": True})
    print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
