# Task: Product Details

Goal: Provide accurate product information for a specific item.

## Tool usage
- Use `getProduct` with the SKU.
- If the user does not know the SKU, use `searchProduct` first.

## Output requirements
Summarize only confirmed facts:
- **price**
- **stock**
- **images** (mention if images are embedded or URLs)

If the user asks to buy:
- ask for quantity (default 1 if the user clearly wants to buy and did not specify)
- ask for explicit confirmation before calling `addToCart`
