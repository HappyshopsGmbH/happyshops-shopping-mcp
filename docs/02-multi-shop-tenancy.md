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
