#!/usr/bin/env python3
"""Regenerates maps/<topic>-timeline.json from a topic whose items carry "segments":
[[from, to], ...] in fractional years. One row per century, each item a bar (or bars) exactly as
long as its span; where two items overlap (a joint reign), they share the row's height. Century
labels and row tracks are "context" shapes. Labels sit inside bars wide enough to hold them.

    python3 maps/make_timeline.py monarchs
    python3 maps/make_timeline.py prime-ministers 50     # 50 years per row; labels from items' "short"
"""
import json
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
slug = sys.argv[1]
SPAN = int(sys.argv[2]) if len(sys.argv) > 2 else 100   # years per row
topic = json.loads((SKILL / "topics" / f"{slug}.json").read_text())
title = next(f["key"] for f in topic["fields"] if f["role"] == "title")
items = topic["items"]

GUTTER, ROW, BAR, TOP = 64, 46, 30, 6
PX = 900 / SPAN                                       # a row is always 900px wide
first = int(min(s[0] for it in items for s in it["segments"]) // SPAN * SPAN)
last = int(max(s[1] for it in items for s in it["segments"]) // SPAN * SPAN)
centuries = list(range(first, last + 1, SPAN))
CHAR_W = 8.2                                          # rough width of a 15px label character


def rect(x, y, w, h, boxes=None):
    w = max(w, 2.2)                                   # nine days still gets a visible sliver
    if boxes is not None:
        boxes.append((x, y, w, h))
    return f"M{x:.1f} {y:.1f}h{w:.1f}v{h:.1f}h{-w:.1f}Z"


def spans(it):
    """The item's segments split at century boundaries: (century, from, to)."""
    for a, b in it["segments"]:
        c = int(a // SPAN * SPAN)
        while a < b:
            end = min(b, c + SPAN)
            yield c, a, end
            a, c = end, c + SPAN


shapes = {}
for idx, it in enumerate(items):
    parts, boxes, best = [], [], None
    for c, a, b in spans(it):
        y = TOP + centuries.index(c) * ROW
        # overlapping items (joint reigns) split the bar's height for the overlap
        cuts = sorted({a, b} | {p for o in items if o is not it for s in o["segments"]
                                for p in s if a < p < b})
        for a2, b2 in zip(cuts, cuts[1:]):
            others = [o for o in items if o is not it and any(s[0] < b2 and s[1] > a2 for s in o["segments"])]
            x, w = GUTTER + (a2 - c) * PX, (b2 - a2) * PX
            if others:
                top = items.index(others[0]) > idx
                h = BAR / 2 - 1
                parts.append(rect(x, y if top else y + BAR / 2 + 1, w, h, boxes))
            else:
                parts.append(rect(x, y, w, BAR, boxes))
                if best is None or w > best[2]:
                    best = (x, y, w)
    x0, y0 = min(b[0] for b in boxes), min(b[1] for b in boxes)
    x1, y1 = max(b[0] + b[2] for b in boxes), max(b[1] + b[3] for b in boxes)
    # the journey's route runs through the start of each reign
    sh = {"d": "".join(parts), "bbox": [round(x0, 1), round(y0, 1), round(x1 - x0, 1), round(y1 - y0, 1)],
          "cx": round(boxes[0][0] + 1, 1), "cy": round(boxes[0][1] + boxes[0][3] / 2, 1)}
    if best and best[2] >= len(it.get("short") or it[title]) * CHAR_W + 12:
        sh["lx"], sh["ly"] = round(best[0] + best[2] / 2, 1), round(best[1] + BAR / 2, 1)
    shapes[it[title]] = sh

for r, c in enumerate(centuries):
    y = TOP + r * ROW
    shapes[f"track-{c}"] = {"d": rect(GUTTER, y, 900, BAR), "bbox": [GUTTER, y, 900, BAR], "cls": "track"}
    shapes[f"label-{c}"] = {"d": "", "bbox": [0, y, GUTTER, BAR], "label": f"{c}s" if SPAN == 100 else str(c), "lx": GUTTER / 2 - 2, "ly": y + BAR / 2}

out = {"source": f"{slug}-timeline", "viewBox": f"0 0 {GUTTER + 900 + 4} {TOP * 2 + len(centuries) * ROW - (ROW - BAR)}",
       "context": True, "shapes": shapes}
(SKILL / "maps" / f"{slug}-timeline.json").write_text(json.dumps(out, separators=(",", ":")))
print(len(items), "bars over", len(centuries), "centuries;", sum("lx" in shapes[it[title]] for it in items), "labelled")
