#!/bin/zsh
# usage: gen.sh name model args...
name=$1; shift; model=$1; shift
out=$(higgsfield generate create $model "$@" --wait --wait-timeout 20m --json 2>&1)
url=$(echo "$out" | grep -o '"result_url": *"[^"]*"' | head -1 | sed 's/.*"\(http[^"]*\)"/\1/')
if [ -n "$url" ]; then ext=${url##*.}; curl -sL -o "$name.$ext" "$url"; echo "OK $name $url"; else echo "FAIL $name"; echo "$out" | tail -20; fi
