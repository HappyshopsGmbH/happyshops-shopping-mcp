# Happyshops Shopping MCP

This repository documents how AI agents can use the **Happyshops Shopping MCP** to interact with different shops (tenants) such as:

- Puzzle-Offensive Shopping MCP (`mcp.puzzle-offensive.de`)
- Spiele-Offensive Shopping MCP (`mcp.spiele-offensive.de`)

The MCP allows agents to:

- search products
- fetch product details
- build and update a cart
- create an order (checkout) and receive an external payment link
- (optionally) access user and order data via an email + one-time code auth flow

## Shipping & Countries

Shipping is available **worldwide**.  
However, shipping costs can be **significantly higher** outside of Germany (`DE`). If the user’s country is not `DE`, it is recommended to pass the country code when calculating cart totals/shipping (see `addToCart`).

## Multi-tenant by Base URL

The same backend serves multiple shops. The **shop context is selected by the MCP base URL/hostname** (tenant resolution).
