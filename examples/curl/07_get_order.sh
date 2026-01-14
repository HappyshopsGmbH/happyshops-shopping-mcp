#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_ORDER_ID:?Set DEMO_ORDER_ID}"
: "${DEMO_EMAIL:=user@example.com}"

rpc "tools/call" "{
  \"name\":\"getOrder\",
  \"arguments\":{
    \"orderId\":\"${DEMO_ORDER_ID}\",
    \"email\":\"${DEMO_EMAIL}\"
  }
}"
