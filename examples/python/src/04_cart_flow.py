import json
from client import McpSseClient, env

def main():
    sku = env("DEMO_SKU", "100080")
    country = env("DEMO_COUNTRY", "DE")

    c = McpSseClient(env("MCP_BASE_URL"))

    add_res = c.call_tool("addToCart", {
        "add": [{"sku": sku, "quantity": 1}],
        "country": country
    })
    print("addToCart:")
    print(json.dumps(add_res, indent=2))

    cart_id = env("DEMO_CART_ID", "<CART_ID>")

    cart_res = c.call_tool("getCart", {"cartId": cart_id})
    print("\ngetCart:")
    print(json.dumps(cart_res, indent=2))

if __name__ == "__main__":
    main()
