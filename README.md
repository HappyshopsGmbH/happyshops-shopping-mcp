mcp-shopping-quickstart

A minimal agent-friendly starter repository showing how to connect to and use our MCP Shopping Server.

This MCP server supports multiple shops dynamically using different hostnames (multi-tenant setup), e.g.:

https://mcp.spiele-offensive.de

https://mcp.puzzle-offensive.de

Both domains point to the same MCP backend, and the shop context is resolved dynamically.

✅ Features

✅ Fast “clone & run” examples for connecting to our MCP server

✅ Works with multiple shops (tenant/shop is selected by the base URL)

✅ Realistic shopping flows:

search products

get product details

add to cart

checkout (with payment links for external payment providers)

✅ Clear tool usage patterns for AI agents

✅ Minimal, copy-paste friendly setup

📦 Repository Structure
.
├── README.md
├── .env.example
├── docs/
│   ├── 01-quickstart.md
│   ├── 02-multi-shop-tenancy.md
│   └── 04-tools.md
├── configs/
│   └── presets/
│       ├── spiele-offensive.json
│       └── puzzle-offensive.json
├── examples/
│   └── node/
│       ├── package.json
│       └── src/
│           ├── 00_connect.ts
│           ├── 01_shop_info.ts
│           ├── 02_search.ts
│           ├── 03_product_details.ts
│           ├── 04_cart_flow.ts
│           └── 05_checkout_flow.ts
└── scripts/
    └── smoke-test.sh

🚀 Quickstart
1) Clone the repo
git clone https://github.com/<your-org>/mcp-shopping-quickstart.git
cd mcp-shopping-quickstart

2) Create your .env
cp .env.example .env


Edit .env:

MCP_BASE_URL=https://mcp.spiele-offensive.de

3) Run the Node examples
cd examples/node
npm install
npm run connect

🏬 Multi-Shop Setup (Tenant via Base URL)

Our MCP server supports multiple shops dynamically.

To switch shops, simply change:

MCP_BASE_URL=https://mcp.spiele-offensive.de


to:

MCP_BASE_URL=https://mcp.puzzle-offensive.de


No other code changes should be required.

✅ Tools are mostly identical across shops.
Small differences (if any) are documented inside tool descriptions and/or returned metadata.

✅ Example Flows
Connect & list tools
npm run connect

Fetch shop info / capabilities
npm run shop-info

Search products
npm run search

Full cart workflow
npm run cart-flow

checkout workflow
npm run checkout-flow

🤖 Recommended Agent Usage Pattern

For AI agents integrating with our MCP, we recommend this flow:

Connect

Fetch shop info / capabilities (optional but recommended)

Search

Resolve product selection

Add to cart

Checkout 

This prevents tool misuse and avoids incorrect assumptions (e.g. shipping rules, currency, availability).

🔐 Authentication

Authentication is usually not required.
It is only needed when accessing user data or order data.

To view user or order information, we use a simple email-based verification (email + one-time code).
After entering the one-time code, an auth key is issued, allowing continued access to the user’s order and account data.

🧰 Tools

Tool availability depends on the server configuration, but typically includes:

Product search

Product details

Cart operations

Checkout / order creation

See full tool documentation here:

docs/04-tools.md

🧪 Smoke Test

To run a simple smoke test (recommended before integrating into an agent):

./scripts/smoke-test.sh

🛠 Troubleshooting
1) Connection issues

Check that MCP_BASE_URL is correct and reachable:

curl -I https://mcp.spiele-offensive.de

2) Tool failures / unexpected behavior

In most cases:

the input schema was wrong

required parameters were missing

the shop/tenant has different rules or disabled features

🧩 Adding Support for More Shops

To add another shop domain (tenant), create another preset:

configs/presets/<shop>.json

Example:

{
  "shop": "new-shop",
  "baseUrl": "https://mcp.new-shop.example",
  "notes": "Optional shop-specific notes"
}

📄 License

This repository is licensed under the MIT License (or update this section with your preferred license).
