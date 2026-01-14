#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_SKU:=100080}"

rpc "tools/call" "{
  \"name\":\"getProduct\",
  \"arguments\":{
    \"sku\":\"${DEMO_SKU}\",
    \"imagesAsUrlOnly\":true
  }
}"
