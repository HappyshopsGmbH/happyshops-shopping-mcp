#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

rpc "tools/call" '{
  "name":"getFlowGraph",
  "arguments":{"flowType":"all"}
}'
