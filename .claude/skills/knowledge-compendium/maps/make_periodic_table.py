#!/usr/bin/env python3
"""Regenerates maps/periodic-table.json: one rounded cell per element, keyed by symbol,
laid out as the standard 18-column table with the lanthanides and actinides in two rows below.
"context": true tells the page to draw elements that aren't in the topic faintly, for shape."""
import json
from pathlib import Path

SYMBOLS = """H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se
Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er
Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No
Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og""".split()
assert len(SYMBOLS) == 118

CELL, GAP, F_GAP = 40, 4, 16
STEP = CELL + GAP


def position(z):
    """(column, row) on the drawn grid, both 1-based; rows 9 and 10 are the f-block rows."""
    if z == 1: return 1, 1
    if z == 2: return 18, 1
    for period, start in ((2, 3), (3, 11)):
        if start <= z < start + 8:
            i = z - start
            return (i + 1 if i < 2 else i + 11), period
    for period, start in ((4, 19), (5, 37)):
        if start <= z < start + 18:
            return z - start + 1, period
    for period, start, f_row in ((6, 55, 9), (7, 87, 10)):
        if start <= z < start + 32:
            i = z - start
            if i < 2: return i + 1, period
            if i < 17: return i - 2 + 3, f_row          # lanthanides / actinides
            return i - 17 + 4, period                    # groups 4–18
    raise ValueError(z)


def cell(col, row):
    x = (col - 1) * STEP
    y = (row - 1) * STEP if row <= 7 else 7 * STEP + F_GAP + (row - 9) * STEP
    r = 4
    d = (f"M{x + r} {y}h{CELL - 2 * r}a{r} {r} 0 0 1 {r} {r}v{CELL - 2 * r}a{r} {r} 0 0 1 -{r} {r}"
         f"h-{CELL - 2 * r}a{r} {r} 0 0 1 -{r} -{r}v-{CELL - 2 * r}a{r} {r} 0 0 1 {r} -{r}z")
    return {"d": d, "bbox": [x, y, CELL, CELL], "lx": x + CELL / 2, "ly": y + CELL / 2}


shapes = {}
for z, sym in enumerate(SYMBOLS, 1):
    shapes[sym] = {**cell(*position(z)), "label": sym, "z": z}
width = 18 * STEP - GAP
height = 7 * STEP + F_GAP + 2 * STEP - GAP
out = {"source": "periodic-table", "viewBox": f"0 0 {width} {height}", "context": True, "shapes": shapes}
Path(__file__).with_name("periodic-table.json").write_text(json.dumps(out, separators=(",", ":")))
print(len(shapes), "cells,", out["viewBox"])
