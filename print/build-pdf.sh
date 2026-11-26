#!/usr/bin/env bash
# Rebuild assets/Viplav_Kumar_Singh_Portfolio.pdf from print/portfolio-print.html
# using headless Google Chrome. Run from anywhere: print/build-pdf.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$ROOT/assets/Viplav_Kumar_Singh_Portfolio.pdf"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 \
  --print-to-pdf="$OUT" \
  "file://$ROOT/print/portfolio-print.html"

ls -lh "$OUT"
