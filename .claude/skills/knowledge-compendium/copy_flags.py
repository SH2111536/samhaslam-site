#!/usr/bin/env python3
"""Copies country flags into the site for a topic whose items carry an ISO alpha-3 "iso" code.

    python3 copy_flags.py <flag-icons package dir> <world-countries countries.json> [slug]

Flags come from flag-icons (MIT, https://github.com/lipis/flag-icons), 4:3 SVGs, fetched with
`npm pack flag-icons@7.2.3`. Each lands at compendium/<slug>/img/flags/<iso2>.svg, and the
topic's items get "image": "img/flags/<iso2>.svg". SVGs with scripts or external references
are refused."""
import json
import re
import shutil
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent
pkg, countries_json = Path(sys.argv[1]), Path(sys.argv[2])
slug = sys.argv[3] if len(sys.argv) > 3 else "world-capitals"
topic_path = SKILL / "topics" / f"{slug}.json"
topic = json.loads(topic_path.read_text())
cca2 = {c["cca3"]: c["cca2"].lower() for c in json.loads(countries_json.read_text())}
dest = SKILL.parents[2] / "compendium" / slug / "img" / "flags"
dest.mkdir(parents=True, exist_ok=True)
unsafe = re.compile(r"<script|\son\w+=|javascript:|<foreignObject|href=\"https?:", re.I)
for it in topic["items"]:
    code = cca2[it["iso"]]
    src = pkg / "flags" / "4x3" / f"{code}.svg"
    if unsafe.search(src.read_text()):
        sys.exit(f"refusing {src.name}: looks unsafe")
    shutil.copy(src, dest / f"{code}.svg")
    it["image"] = f"img/flags/{code}.svg"
topic_path.write_text(json.dumps(topic, indent=2, ensure_ascii=False) + "\n")
print(f"{len(topic['items'])} flags into {dest.relative_to(SKILL.parents[2])}")
