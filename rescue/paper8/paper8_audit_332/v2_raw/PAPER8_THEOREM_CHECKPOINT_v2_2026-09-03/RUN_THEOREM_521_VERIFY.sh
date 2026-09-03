#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 RUN_THEOREM_521_VERIFY.py
python3 VERIFY_HASHES.py
