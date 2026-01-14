# Workflows

This page describes the recommended tool sequences (agent flows) for the Happyshops Shopping MCP.

## Main Flow: Product Search → Cart → Checkout → Payment → Order Status

### 1) Search for products

```json
{
  "tool": "searchProduct",
  "arguments": {
    "searchPhrase": "puzzle 1000",
    "limit": 20
  }
}
```
2) Inspect a product (by SKU)
```json
{
  "tool": "getProduct",
  "arguments": {
    "sku": "100080"
  }
}
```
3) Add to cart (creates a new cart if cartId is omitted)
```json
{
  "tool": "addToCart",
  "arguments": {
    "add": [
      {
        "sku": "100080",
        "quantity": 1
      }
    ],
    "country": "DE"
  }
}
```
4) Review cart
```json
{
  "tool": "getCart",
  "arguments": {
    "cartId": "<CART_ID>"
  }
}
```
5) Checkout (create order)
Requires billing address + email

Returns an external payment link (this is the checkout step)

```json
{
  "tool": "createOrder",
  "arguments": {
    "paymentMethod": "paypal",
    "cartId": "<CART_ID>",
    "billingAddress": {
      "firstName": "Max",
      "lastName": "Mustermann",
      "streetName": "Musterstrasse",
      "houseNumber": "1",
      "postalCode": "12345",
      "city": "Berlin",
      "country": "DE",
      "email": "user@example.com"
    }
  }
}
```
6) External payment
The user completes payment via the returned payment link.

After successful payment, the user receives an order confirmation email.

7) (Optional) Fetch order status
```json
{
  "tool": "getOrder",
  "arguments": {
    "orderId": "<ORDER_ID>",
    "email": "user@example.com"
  }
}
```
Cart Management
Add items
```json
{
  "tool": "addToCart",
  "arguments": {
    "cartId": "<CART_ID>",
    "add": [
      {
        "sku": "100080",
        "quantity": 1
      }
    ]
  }
}
```
Change quantities (replace)
```json
{
  "tool": "addToCart",
  "arguments": {
    "cartId": "<CART_ID>",
    "replace": [
      {
        "sku": "100080",
        "quantity": 2
      }
    ]
  }
}
```
Remove items (delete)
```json
{
  "tool": "addToCart",
  "arguments": {
    "cartId": "<CART_ID>",
    "delete": [
      {
        "sku": "100080"
      }
    ]
  }
}
```
Always verify the cart
```json
{
  "tool": "getCart",
  "arguments": {
    "cartId": "<CART_ID>"
  }
}
```
Accessing Protected User Data
If the user requests user/account details or private data, use the auth flow first.

1) Request one-time code (Step 1)
```json
{
  "tool": "getAuthKey",
  "arguments": {
    "email": "user@example.com"
  }
}
```
2) Exchange code for authKey (Step 2)
```json
{
  "tool": "getAuthKey",
  "arguments": {
    "email": "user@example.com",
    "code": "123456"
  }
}
```
3) Fetch user data
```json
{
  "tool": "getUser",
  "arguments": {
    "email": "user@example.com",
    "authKey": "<AUTH_KEY>"
  }
}
```
