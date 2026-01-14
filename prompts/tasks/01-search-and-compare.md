# Task: Search and Compare

Goal: Help the user find relevant products and compare a small set of results.

## When to use tools
1) Call `searchProduct` using the user’s query.
2) If needed, call `getProduct` for 1–3 shortlisted items to confirm details.

## Output requirements
- Present a short list of options.
- Compare using available data (never invent).
- Focus on: **price, stock, images** (and only what the tools provide).

## If the request is ambiguous
Ask one short question to clarify (e.g., puzzle vs board game, budget, piece count).
