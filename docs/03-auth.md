# Authentication

Authentication is usually **not required**.

It is only required when accessing **private data**, such as:
- user/account data (`getUser`)
- order data (`getOrder`, `cancelOrder`)
- protected cart data (optional `email` + `authKey` in `getCart`)

## Auth Model: Email + One-Time Code → Auth Key

To access private data, the MCP uses a simple two-step flow handled by `getAuthKey`:

### Step 1 — Request a code
Send the user’s email address. The email must match the user’s account/order email.

```json
{
  "tool": "getAuthKey",
  "arguments": {
    "email": "user@example.com"
  }
}
```
A one-time code is sent to the email address and is valid for ~10 minutes.

### Step 2 — Exchange code for an authKey
Send the email and the received code:

```json
{
  "tool": "getAuthKey",
  "arguments": {
    "email": "user@example.com",
    "code": "123456"
  }
}
```
The MCP returns an authKey that is valid longer-term than the one-time code.

# Using the authKey
Once an authKey is obtained, it can be used to access private endpoints/tools:

Example: getUser
```json
{
  "tool": "getUser",
  "arguments": {
    "email": "user@example.com",
    "authKey": "<AUTH_KEY>"
  }
}
```

Example: getCart (protected cart data)
```json
{
  "tool": "getCart",
  "arguments": {
    "cartId": "<CART_ID>",
    "email": "user@example.com",
    "authKey": "<AUTH_KEY>"
  }
}
```
# Agent Guidance
Only start the auth flow if the user explicitly requests private data (orders, user/account details).

Never guess or fabricate order states or user data.

Ask the user for the email address used for the shop account/order.
