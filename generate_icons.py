#!/usr/bin/env python3
"""
Generate PWA icons using PIL (Pillow)
Creates simple branded icons for the Thor AI Advisory site
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create icons directory if it doesn't exist
os.makedirs('icons', exist_ok=True)

# Icon sizes needed for PWA
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

def create_icon(size):
    """Create a simple icon with the Thor branding"""
    # Create a new image with brand colors
    img = Image.new('RGB', (size, size), color='#2c3e50')
    draw = ImageDraw.Draw(img)

    # Calculate font sizes based on icon size
    main_font_size = int(size * 0.4)
    sub_font_size = int(size * 0.08)

    # Try to use a basic font (fallback to default if not available)
    try:
        main_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", main_font_size)
        sub_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", sub_font_size)
    except:
        # Use default font if system font not available
        main_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # Draw the main "T" letter
    text = "T"
    bbox = draw.textbbox((0, 0), text, font=main_font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - size * 0.05
    draw.text((x, y), text, fill='#ffffff', font=main_font)

    # Draw subtitle for larger icons
    if size >= 144:
        subtitle = "AI"
        bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
        sub_width = bbox[2] - bbox[0]
        sub_x = (size - sub_width) // 2
        sub_y = y + text_height + 5
        draw.text((sub_x, sub_y), subtitle, fill='#d4a574', font=sub_font)

    return img

print("Generating PWA icons...")
for size in sizes:
    icon = create_icon(size)
    filename = f'icons/icon-{size}x{size}.png'
    icon.save(filename, 'PNG')
    print(f"Created {filename}")

print("\n✅ All icons generated successfully!")
print("Icons are ready for PWA use.")