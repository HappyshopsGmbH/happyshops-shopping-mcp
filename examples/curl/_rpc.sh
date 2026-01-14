#!/usr/bin/env bash
set -euo pipefail

: "${MCP_POST_URL:?Set MCP_POST_URL first (ideally extracted from SSE)}"

rpc() {
  local method="$1"
  local params="${2:-}"

  local id="rpc_$(date +%s)_$RANDOM"

  if [[ -n "${params}" ]]; then
    curl -sS -X POST "${MCP_POST_URL}" \
      -H 'content-type: application/json' \
      -d "{
        \"jsonrpc\":\"2.0\",
        \"id\":\"${id}\",
        \"method\":\"${method}\",
        \"params\": ${params}
      }"
  else
    curl -sS -X POST "${MCP_POST_URL}" \
      -H 'content-type: application/json' \
      -d "{
        \"jsonrpc\":\"2.0\",
        \"id\":\"${id}\",
        \"method\":\"${method}\"
      }"
  fi
  echo
}
