docs/01-quickstart.md
# Quickstart

This guide shows the minimal steps to connect an agent to the Happyshops Shopping MCP and run typical shopping operations.

## Choose a Shop (Base URL)

If the agent originates from a shop website, use the matching MCP base URL:

- Puzzle-Offensive website → `https://mcp.puzzle-offensive.de/`
- Spiele-Offensive website → `https://mcp.spiele-offensive.de/`

If the agent does not originate from a specific website context, pick the base URL explicitly.

## MCP Client Config (Template)

Example MCP client config:

```json
{
  "mcpServers": {
    "spiele-offensive-mcp": {
      "url": "https://mcp.spiele-offensive.de/"
    }
  }
}
```

Recommended First Call

Call getFlowGraph to discover the main flows and intended tool usage.

Example:
```json
{
  "tool": "getFlowGraph",
  "arguments": {
    "flowType": "all"
  }
}
```
Minimal Shopping Flow (Happy Path)

searchProduct (find SKUs)

getProduct (inspect a SKU)

addToCart (create cart or update cart)

getCart (review totals / shipping)

createOrder (checkout → returns external payment link)

User pays externally

getOrder (optional: check status)
Agents should rely on the MCP tool schema/description rather than hardcoding assumptions.
