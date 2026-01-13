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

{
  "tool": "getFlowGraph",
  "arguments": {
    "flowType": "all"
  }
}

Minimal Shopping Flow (Happy Path)

searchProduct (find SKUs)

getProduct (inspect a SKU)

addToCart (create cart or update cart)

getCart (review totals / shipping)

createOrder (checkout → returns external payment link)

User pays externally

getOrder (optional: check status)


---

## `docs/02-multi-shop-tenancy.md`
```md
# Multi-Shop Tenancy

The Happyshops Shopping MCP is **multi-tenant**: multiple shop domains point to the same MCP backend.

## How the Shop Is Selected

The shop/tenant is determined by the **MCP base URL** (hostname), e.g.:

- `https://mcp.spiele-offensive.de/`
- `https://mcp.puzzle-offensive.de/`

No additional `shopId` or tenant parameter is required.

## Tool Compatibility Across Shops

Tools are **mostly identical** across shops. Differences are typically:

- different assortments/catalogs
- small tool schema differences (additional filters/parameters)

These differences are documented in the **tool definitions**.

### Example: Shop-specific Search Parameters

For Puzzle-Offensive, `searchProduct` may support extra puzzle-specific filters such as:

- `piecesFrom` (minimum piece count)
- `piecesUp` (>= or <= behavior)

Agents should rely on the MCP tool schema/description rather than hardcoding assumptions.
