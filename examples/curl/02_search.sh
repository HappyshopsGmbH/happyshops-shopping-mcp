#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_rpc.sh"

: "${DEMO_SEARCH_PHRASE:=Ravensburger}"

rpc "tools/call" "{
  \"name\":\"searchProduct\",
  \"arguments\":{
    \"searchPhrase\":\"${DEMO_SEARCH_PHRASE}\",
    \"limit\":20,
    \"page\":1
  }
}"
