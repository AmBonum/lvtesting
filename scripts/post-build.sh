#!/bin/bash
# Post-build script: renames _next to assets and updates all references
# This fixes 404 errors on shared hosting that blocks _next directories

set -e

OUT_DIR="out"

# In-place sed differs between BSD (macOS: `sed -i ''`) and GNU (Linux/CI: `sed -i`).
if sed --version >/dev/null 2>&1; then
  SED_I=(sed -i)
else
  SED_I=(sed -i '')
fi

echo "Renaming _next to assets..."
mv "$OUT_DIR/_next" "$OUT_DIR/assets"

echo "Updating references in HTML files..."
find "$OUT_DIR" -name "*.html" -exec "${SED_I[@]}" 's|/_next/|/assets/|g' {} +
find "$OUT_DIR" -name "*.html" -exec "${SED_I[@]}" 's|"_next/|"assets/|g' {} +

echo "Updating references in JS files..."
find "$OUT_DIR/assets" -name "*.js" -exec "${SED_I[@]}" 's|/_next/|/assets/|g' {} +

echo "Updating references in CSS files..."
find "$OUT_DIR/assets" -name "*.css" -exec "${SED_I[@]}" 's|/_next/|/assets/|g' {} +

echo "Updating references in TXT files..."
find "$OUT_DIR" -name "*.txt" -exec "${SED_I[@]}" 's|/_next/|/assets/|g' {} +
find "$OUT_DIR" -name "*.txt" -exec "${SED_I[@]}" 's|"_next/|"assets/|g' {} +

echo "Done! Upload the contents of out/ to your web/ folder."
