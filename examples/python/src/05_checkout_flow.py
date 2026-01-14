import json
from client import McpSseClient, env

def main():
    cart_id = env("DEMO_CART_ID", "<CART_ID>")
    payment_method = env("DEMO_PAYMENT_METHOD", "paypal")
    email = env("DEMO_EMAIL", "user@example.com")

    billing_address = {
        "firstName": "Max",
        "lastName": "Mustermann",
        "streetName": "Musterstrasse",
        "houseNumber": "1",
        "postalCode": "12345",
        "city": "Berlin",
        "country": "DE",
        "email": email
    }

    c = McpSseClient(env("MCP_BASE_URL"))
    res = c.call_tool("createOrder", {
        "paymentMethod": payment_method,
        "cartId": cart_id,
        "billingAddress": billing_address
    })

    print(json.dumps(res, indent=2))
    print("\nIMPORTANT: Always show the external payment link returned by createOrder.")

if __name__ == "__main__":
    main()
