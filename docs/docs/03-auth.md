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
