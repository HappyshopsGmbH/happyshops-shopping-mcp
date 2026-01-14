#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_EMAIL:=user@example.com}"
: "${DEMO_CODE:=}"
: "${DEMO_AUTH_KEY:=}"

if [[ -z "${DEMO_CODE}" && -z "${DEMO_AUTH_KEY}" ]]; then
  echo "Step 1: request one-time code (valid ~10 minutes)"
  rpc "tools/call" "{
    \"name\":\"getAuthKey\",
    \"arguments\":{
      \"email\":\"${DEMO_EMAIL}\"
    }
  }"
  echo
  echo "Now set DEMO_CODE and rerun."
  exit 0
fi

if [[ -z "${DEMO_AUTH_KEY}" && -n "${DEMO_CODE}" ]]; then
  echo "Step 2: exchange code for authKey"
  rpc "tools/call" "{
    \"name\":\"getAuthKey\",
    \"arguments\":{
      \"email\":\"${DEMO_EMAIL}\",
      \"code\":\"${DEMO_CODE}\"
    }
  }"
  echo
  echo "Now set DEMO_AUTH_KEY from response and rerun to call getUser."
  exit 0
fi

echo "Fetching user data with authKey"
rpc "tools/call" "{
  \"name\":\"getUser\",
  \"arguments\":{
    \"email\":\"${DEMO_EMAIL}\",
    \"authKey\":\"${DEMO_AUTH_KEY}\"
  }
}"
