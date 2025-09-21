#!/bin/bash

# Icon Generator Script for PWA
# This creates simple placeholder icons - replace with your actual logo

echo "Creating icons directory..."
mkdir -p icons

# You'll need to install ImageMagick for this to work:
# Mac: brew install imagemagick
# Ubuntu/Debian: sudo apt-get install imagemagick
# Windows: Download from https://imagemagick.org/script/download.php

# Create a simple SVG logo (replace this with your actual logo)
cat > icons/logo.svg <<EOF
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2c3e50"/>
  <text x="256" y="280" font-family="Inter, sans-serif" font-size="200" font-weight="600" fill="#ffffff" text-anchor="middle">T</text>
  <text x="256" y="380" font-family="Inter, sans-serif" font-size="48" fill="#d4a574" text-anchor="middle">AI ADVISORY</text>
</svg>
EOF

echo "Generating PNG icons from SVG..."

# Generate all required sizes
for size in 72 96 128 144 152 192 384 512; do
  echo "Creating ${size}x${size} icon..."
  # Using ImageMagick (if installed)
  # convert -background none icons/logo.svg -resize ${size}x${size} icons/icon-${size}x${size}.png
  
  # Alternative: create placeholder text file (replace with actual icons)
  echo "Placeholder for ${size}x${size} icon" > icons/icon-${size}x${size}.txt
done

echo "Icons created! Note: These are placeholder files."
echo "To generate actual PNG icons, you need to:"
echo "1. Install ImageMagick"
echo "2. Uncomment the 'convert' line in this script"
echo "3. Replace the SVG with your actual logo"
echo ""
echo "Or use an online tool like:"
echo "- https://realfavicongenerator.net/"
echo "- https://www.pwabuilder.com/imageGenerator"
echo "- https://maskable.app/"
