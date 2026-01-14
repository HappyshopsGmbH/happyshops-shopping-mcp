#!/usr/bin/env bash
set -euo pipefail

: "${MCP_BASE_URL:?Need MCP_BASE_URL (e.g. https://mcp.puzzle-offensive.de)}"

echo "Trying to extract MCP_POST_URL from SSE stream at: ${MCP_BASE_URL}"
echo "Waiting for an endpoint announcement..."
echo

# We read SSE lines and attempt to find:
# - event: endpoint
# - data: {"url":"https://..."}  OR data: https://...
#
# This is intentionally tolerant. If it fails, set MCP_POST_URL manually.

MCP_POST_URL="$(
  curl -sS -N -H "Accept: text/event-stream" "${MCP_BASE_URL}" \
  | awk '
      BEGIN { in_endpoint=0 }
      /^event: *endpoint/ { in_endpoint=1; next }
      /^event:/ { in_endpoint=0; next }
      /^data:/ {
        line=$0
        sub(/^data:[ ]*/, "", line)

        # If we are in endpoint event, try to parse
        if (in_endpoint==1) {
          # JSON: {"url":"..."} or {"endpoint":"..."}
          if (match(line, /"url"[ ]*:[ ]*"([^"]+)"/, m)) { print m[1]; exit }
          if (match(line, /"endpoint"[ ]*:[ ]*"([^"]+)"/, m)) { print m[1]; exit }
          # plain URL
          if (match(line, /^https?:\/\/[^ ]+/, m2)) { print m2[0]; exit }
        }

        # Also try in normal messages
        if (match(line, /"url"[ ]*:[ ]*"([^"]+)"/, m3)) { print m3[1]; exit }
        if (match(line, /"endpoint"[ ]*:[ ]*"([^"]+)"/, m4)) { print m4[1]; exit }
      }
    '
)"

if [[ -z "${MCP_POST_URL}" ]]; then
  echo "Could not extract MCP_POST_URL from SSE."
  echo "Fallback: set MCP_POST_URL manually or try using MCP_BASE_URL as POST target."
  exit 1
fi

echo "Extracted MCP_POST_URL:"
echo "${MCP_POST_URL}"
echo
echo "Run this to export it in your shell:"
echo "export MCP_POST_URL='${MCP_POST_URL}'"
