# Errors & Retries

At the moment there is no fixed, public error contract documented across all tools.
Agents should therefore implement robust, defensive handling.

## General Guidelines for Agents

- Treat tool calls as the source of truth (do not guess).
- If a tool returns an error, prefer:
  1) validate the input arguments against the tool schema
  2) retry with corrected inputs
  3) if still failing, ask the user for missing information

## Recommended Retry Policy

Use retries only for transient failures:

Retry (with small backoff) if:
- timeouts
- temporary network/connection issues
- transient backend errors

Do NOT blindly retry if:
- validation errors (missing required fields)
- authentication errors (wrong email/code/authKey)
- user-driven issues (e.g., user provided wrong order ID)

## Common Failure Cases

### Product not found / empty search
- Ask the user to refine the search phrase or provide an SKU.

### Cart or cartId invalid
- Recreate a cart by calling `addToCart` without `cartId`.

### Checkout failures (`createOrder`)
- Ensure billing address fields are complete.
- Confirm country code is ISO-2 (e.g., `DE`, `US`).
- Confirm email is valid.

### Protected data access
- If calling `getUser` fails, obtain a valid authKey first (see `03-auth.md`).
- One-time codes expire after ~10 minutes.
