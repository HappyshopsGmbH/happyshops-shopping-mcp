# Tools

Below is a high-level reference for the available tools. Exact schemas and shop-specific differences are included in the MCP tool definitions.

## Product & Search

### `searchProduct`
Search products by name, SKU, brand, or keywords.

Required:
- `searchPhrase` (string)

Optional:
- `page` (int, default 1)
- `limit` (int, default 100)

Shop-specific (may exist depending on tenant):
- `piecesFrom` (int) — puzzle filters
- `piecesUp` (bool)

Example:
```json
{
  "tool": "searchProduct",
  "arguments": {
    "searchPhrase": "Ravensburger",
    "limit": 20
  }
}
```
`getProduct`
Fetch product details for a SKU. By default images may be embedded (base64) unless disabled.

Required:

`sku` (string)

Optional:

`imagesAsUrlOnly` (bool)

Example:

```json
{
  "tool": "getProduct",
  "arguments": {
    "sku": "100080",
    "imagesAsUrlOnly": true
  }
}
```
# Cart
`addToCart`
Create or update a cart.

If `cartId` is omitted → a new cart may be created

If `cartId` is provided → updates an existing cart

Supports `add`, `replace`, `delete` arrays

Optional:

`country` (ISO Alpha-2, e.g. `DE`, `US`) to calculate shipping for that country (default is `DE`)

Example (create cart + add item):

```json
{
  "tool": "addToCart",
  "arguments": {
    "add": [{ "sku": "100080", "quantity": 1 }],
    "country": "DE"
  }
}
```
Example (update cart):

```json
{
  "tool": "addToCart",
  "arguments": {
    "cartId": "<CART_ID>",
    "replace": [{ "sku": "100080", "quantity": 2 }]
  }
}
```
`getCart`
Fetch cart by `cartId`.

Required:

`cartId` (string)

Optional (for protected cart data):

`email` (string)

`authKey` (string)

Example:

```json
{
  "tool": "getCart",
  "arguments": {
    "cartId": "<CART_ID>"
  }
}
```
Checkout / Orders
`createOrder`
Checkout the cart and create an order. Returns an external payment link for payment providers.

Required:

`paymentMethod` (string, e.g. `paypal`)

`cartId` (string)

`billingAddress` (object with required fields)

Optional:

`shippingAddress` (object). If omitted, billing address is used for shipping.

Notes:

Country must be ISO-2 (e.g. `DE`, `US`)

After successful payment, the user receives an order confirmation email

`getOrder`
Fetch a single order by ID. Requires the email used for the order.

Required:

`orderId` (string)

`email` (string)

`cancelOrder`
Cancel/delete an order by ID. Requires the email used for the order.

Required:

`orderId` (string)

`email` (string)

# User Data (Protected)
`getUser`
Fetch user data (e.g., order numbers). Requires `email` + `authKey`.

Required:

`email` (string)

`authKey` (string)

`getAuthKey`
Two-step auth flow tool. See `03-auth.md`.

# Guidance / Discovery
`getFlowGraph`
Returns recommended flow graphs for common workflows.

Optional:

`flowType` (string): `all` (default), `productSearchToOrder`, `cartManagement`, `orderManagement`, `productBrowsing`
