# Task: Checkout

Goal: Create an order from a cart and return the external payment link.

## Preconditions
- User explicitly requests checkout / ordering.
- You have:
  - `cartId`
  - billing address (required fields)
  - email
- Payment method: only **paypal**

## Address handling
If the user already provided an address:
- Confirm it: “Is this billing address correct?”

## Tool usage
1) Call `createOrder` using:
   - `paymentMethod: "paypal"`
   - `cartId`
   - `billingAddress`
   - optional `shippingAddress` (if different)

## After `createOrder`
- Always display the **payment link** clearly.
- Explain payment happens externally.
- Do NOT automatically call `getOrder`.
