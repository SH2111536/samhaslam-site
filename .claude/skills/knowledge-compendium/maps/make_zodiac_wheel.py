#!/usr/bin/env python3
"""Regenerates maps/zodiac-wheel.json: twelve ring segments for the signs, Aries at the top and
running clockwise, keyed by sign name. Inside them, a ring of months ("context" shapes, labelled,
not interactive) placed by date, so each sign sits beside the part of the year it covers."""
import json
import math
from pathlib import Path

SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
         "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
C = 300                      # centre
R_OUT, R_IN = 290, 186       # sign ring
M_OUT, M_IN = 180, 138       # month ring
ARIES_START = 79             # 21 March, as a 0-based day of the year


def pt(r, deg):
    a = math.radians(deg)
    return C + r * math.cos(a), C + r * math.sin(a)


def sector(r0, r1, a0, a1):
    (x0, y0), (x1, y1) = pt(r1, a0), pt(r1, a1)
    (x2, y2), (x3, y3) = pt(r0, a1), pt(r0, a0)
    big = 1 if a1 - a0 > 180 else 0
    d = (f"M{x0:.1f} {y0:.1f}A{r1} {r1} 0 {big} 1 {x1:.1f} {y1:.1f}"
         f"L{x2:.1f} {y2:.1f}A{r0} {r0} 0 {big} 0 {x3:.1f} {y3:.1f}Z")
    pts = [pt(r, a0 + (a1 - a0) * k / 8) for r in (r0, r1) for k in range(9)]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    mx, my = pt((r0 + r1) / 2, (a0 + a1) / 2)
    return {"d": d, "bbox": [round(min(xs), 1), round(min(ys), 1), round(max(xs) - min(xs), 1), round(max(ys) - min(ys), 1)],
            "lx": round(mx, 1), "ly": round(my, 1), "cx": round(mx, 1), "cy": round(my, 1)}


shapes = {}
GAP = 0.6  # degrees between segments
for i, s in enumerate(SIGNS):
    a0 = -90 + i * 30
    shapes[s] = sector(R_IN, R_OUT, a0 + GAP, a0 + 30 - GAP)

day_angle = lambda d: -90 + (d - ARIES_START) / 365 * 360
start = 0
for m, n in zip(MONTHS, DAYS):
    shapes[f"month-{m}"] = {**sector(M_IN, M_OUT, day_angle(start) + GAP, day_angle(start + n) - GAP), "label": m}
    start += n

out = {"source": "zodiac-wheel", "viewBox": "0 0 600 600", "context": True, "shapes": shapes}
Path(__file__).with_name("zodiac-wheel.json").write_text(json.dumps(out, separators=(",", ":")))
print(len(shapes), "shapes")
