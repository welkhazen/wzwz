from PIL import Image, ImageDraw, ImageFilter
import os

SRC = r"C:\Users\user\OneDrive\Desktop\wzwz\src\assets\favicon.png"
OUT_DIR = r"C:\Users\user\OneDrive\Desktop\wzwz\public"

BG = (13, 13, 13)
GOLD = (241, 196, 45)

def make_icon(size, logo_ratio=0.62):
    icon = Image.new("RGBA", (size, size), (*BG, 255))

    # radial gold glow
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy, r = size // 2, size // 2, int(size * 0.34)
    for i in range(r, 0, -1):
        alpha = int(60 * (1 - i / r) ** 2)
        gd.ellipse([cx - i, cy - i, cx + i, cy + i], fill=(*GOLD, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(int(size * 0.04)))
    icon = Image.alpha_composite(icon, glow)

    # logo
    logo = Image.open(SRC).convert("RGBA")
    px = logo.load()
    for y in range(logo.height):
        for x in range(logo.width):
            r2, g, b, a = px[x, y]
            if r2 > 230 and g > 230 and b > 230:
                px[x, y] = (r2, g, b, 0)

    logo_size = int(size * logo_ratio)
    logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
    off = (size - logo_size) // 2
    icon.paste(logo, (off, off), logo)
    return icon.convert("RGB")

sizes = [192, 512]
for s in sizes:
    path = os.path.join(OUT_DIR, f"raw-logo-{s}.png")
    make_icon(s).save(path, "PNG", quality=100)
    print(f"Saved {path}")

# maskable — logo at 60% with safe zone padding (logo at ~40% for maskable safe area)
maskable = make_icon(512, logo_ratio=0.45)
maskable.save(os.path.join(OUT_DIR, "raw-logo-512-maskable.png"), "PNG", quality=100)
print("Saved maskable icon")
