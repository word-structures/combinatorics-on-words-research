#!/bin/bash
cd "$(dirname "$0")"
for i in 2 3 4 5 6 7 8; do
  E=$(node -e "console.log(JSON.parse(require('fs').readFileSync('../fixtures/canonical_pools.json','utf8')).E[$i])")
  node joint_eaf.js pc_E$i 1 1 500000000 500000000 "$E"
done
