"""Convert downloaded PNG assets to web-ready WebP at sensible sizes."""
import sys
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parent.parent / "assets"

# name -> (max width for full, make an @1x variant?)
SPECS = {
    "hero": 2560,
    "svc-hot-stone": 1200,
    "svc-cupping": 1200,
    "svc-aromatherapy": 1200,
    "svc-deep-tissue": 1200,
}

def process(name: str, max_w: int) -> None:
    src = ASSETS / f"{name}.png"
    if not src.exists():
        return
    img = Image.open(src).convert("RGB")
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    out = ASSETS / f"{name}.webp"
    img.save(out, "WEBP", quality=82, method=6)
    # half-size variant for smaller viewports
    small = img.resize((img.width // 2, img.height // 2), Image.LANCZOS)
    small.save(ASSETS / f"{name}-sm.webp", "WEBP", quality=80, method=6)
    print(f"{name}: {img.width}x{img.height} -> {out.stat().st_size//1024}KB, sm={(ASSETS/f'{name}-sm.webp').stat().st_size//1024}KB")

if __name__ == "__main__":
    names = sys.argv[1:] or SPECS.keys()
    for n in names:
        process(n, SPECS.get(n, 1200))
