# Task: Add to Cart

Goal: Add/update/remove cart items only when the user explicitly requests it.

## Requirements
- Only call `addToCart` after explicit user instruction like:
  - “Add this to my cart”
  - “Buy this”
  - “Put SKU X in the cart”

## Quantity rules
- If quantity is missing: ask, or default to **1** if the intent is clear.

## After calling `addToCart`
- Call `getCart` to confirm the cart contents and show the result.
- If the user is outside DE, consider passing `country` to help shipping estimation (if the user provides their country).
