#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_SKU:=100080}"
: "${DEMO_COUNTRY:=DE}"
: "${DEMO_CART_ID:=}"

echo "1) addToCart (creates cart if cartId omitted)"
rpc "tools/call" "{
  \"name\":\"addToCart\",
  \"arguments\":{
    \"add\":[{\"sku\":\"${DEMO_SKU}\",\"quantity\":1}],
    \"country\":\"${DEMO_COUNTRY}\"
  }
}"

echo
echo "NOTE: set DEMO_CART_ID from addToCart response, then run getCart."
if [[ -z "${DEMO_CART_ID}" ]]; then
  echo "DEMO_CART_ID is empty -> skipping getCart."
  exit 0
fi

echo
echo "2) getCart"
rpc "tools/call" "{
  \"name\":\"getCart\",
  \"arguments\":{
    \"cartId\":\"${DEMO_CART_ID}\"
  }
}"
