from PIL import Image, ImageDraw, ImageFilter
import os

SRC = r"C:\Users\user\OneDrive\Desktop\wzwz\src\assets\favicon.png"
OUT = r"C:\Users\user\OneDrive\Desktop\wzwz\ios\RAW.swiftpm\Assets.xcassets\AppIcon.appiconset\AppIcon.png"

SIZE = 1024
BG = (13, 13, 13)          # #0D0D0D — matches app background
GOLD = (241, 196, 45)       # raw-gold

# ── canvas ──────────────────────────────────────────────────────────────────
icon = Image.new("RGBA", (SIZE, SIZE), (*BG, 255))

# subtle gold radial glow behind the logo
glow_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow_layer)
cx, cy, r = SIZE // 2, SIZE // 2, 340
for i in range(r, 0, -1):
    alpha = int(60 * (1 - i / r) ** 2)
    gd.ellipse([cx - i, cy - i, cx + i, cy + i], fill=(*GOLD, alpha))
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(40))
icon = Image.alpha_composite(icon, glow_layer)

# ── logo ────────────────────────────────────────────────────────────────────
logo = Image.open(SRC).convert("RGBA")

# remove white/near-white background
pixels = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = pixels[x, y]
        if r > 230 and g > 230 and b > 230:
            pixels[x, y] = (r, g, b, 0)

# scale logo to ~62% of icon (nice padding)
logo_size = int(SIZE * 0.62)
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

# paste centered
offset = (SIZE - logo_size) // 2
icon.paste(logo, (offset, offset), logo)

# ── save ────────────────────────────────────────────────────────────────────
icon = icon.convert("RGB")
icon.save(OUT, "PNG", quality=100)
print(f"Saved {OUT}")
