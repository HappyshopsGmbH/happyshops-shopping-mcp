#!/usr/bin/env bash
set -euo pipefail

: "${MCP_BASE_URL:?Need MCP_BASE_URL (e.g. https://mcp.puzzle-offensive.de)}"

echo "Listening to SSE stream at: ${MCP_BASE_URL}"
echo "Press Ctrl+C to stop."
echo
curl -N -H "Accept: text/event-stream" "${MCP_BASE_URL}"
