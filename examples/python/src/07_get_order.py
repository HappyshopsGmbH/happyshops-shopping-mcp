import json
from client import McpSseClient, env

def main():
    order_id = env("DEMO_ORDER_ID", "<ORDER_ID>")
    email = env("DEMO_EMAIL", "user@example.com")

    c = McpSseClient(env("MCP_BASE_URL"))
    res = c.call_tool("getOrder", {"orderId": order_id, "email": email})
    print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
