#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_ORDER_ID:?Set DEMO_ORDER_ID}"
: "${DEMO_EMAIL:=user@example.com}"

echo "WARNING: cancelOrder changes state. Only run with explicit user confirmation."

rpc "tools/call" "{
  \"name\":\"cancelOrder\",
  \"arguments\":{
    \"orderId\":\"${DEMO_ORDER_ID}\",
    \"email\":\"${DEMO_EMAIL}\"
  }
}"
