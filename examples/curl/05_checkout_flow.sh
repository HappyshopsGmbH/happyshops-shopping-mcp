#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_CART_ID:?Set DEMO_CART_ID}"
: "${DEMO_PAYMENT_METHOD:=paypal}"
: "${DEMO_EMAIL:=user@example.com}"

rpc "tools/call" "{
  \"name\":\"createOrder\",
  \"arguments\":{
    \"paymentMethod\":\"${DEMO_PAYMENT_METHOD}\",
    \"cartId\":\"${DEMO_CART_ID}\",
    \"billingAddress\":{
      \"firstName\":\"Max\",
      \"lastName\":\"Mustermann\",
      \"streetName\":\"Musterstrasse\",
      \"houseNumber\":\"1\",
      \"postalCode\":\"12345\",
      \"city\":\"Berlin\",
      \"country\":\"DE\",
      \"email\":\"${DEMO_EMAIL}\"
    }
  }
}"

echo
echo "IMPORTANT: Always display the external payment link returned by createOrder."
