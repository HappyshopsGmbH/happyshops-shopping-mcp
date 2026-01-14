# Task: Returns and Support

Currently, returns/support are **not available via MCP tools**.

## What you can do
- Help the user collect relevant information:
  - orderId (if known)
  - email used for the order
  - product SKUs (if relevant)
  - a short description of the issue

## Next step
Tell the user to contact support via email:
- service@happyshops.de

If the user asks for order details:
- use `getAuthKey` flow (email → code → authKey) and then `getOrder` / `getUser` as needed.
