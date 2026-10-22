#!/usr/bin/env python3
"""Build knowledge-compendium pages from topic JSON files.

    python3 build.py                 # rebuild every topic page + the hub into the site
    python3 build.py roman-gods      # rebuild one topic (+ the hub)
    python3 build.py --preview DIR   # write gate-free copies into DIR for previewing

Topic data lives in topics/<slug>.json (schema in SKILL.md). Pages land in
<repo>/compendium/<slug>/index.html, the hub in <repo>/compendium/index.html.
Icons are Lucide (lucide-static); any not already vendored in icons/ are fetched
once with `npm pack` and copied in, so later builds work offline.
"""

import argparse
import base64
import html
import json
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import unicodedata
from pathlib import Path

SKILL = Path(__file__).resolve().parent
REPO = SKILL.parents[2]
TOPICS = SKILL / "topics"
ICONS = SKILL / "icons"
MAPS = SKILL / "maps"
OUT = REPO / "compendium"
LUCIDE_VERSION = "0.460.0"

# icons the page chrome itself uses
UI_ICONS = ["arrow-left", "arrow-right", "shuffle", "link-2", "brain", "eye", "eye-off", "sparkles", "x", "rotate-ccw", "route", "list-checks"]

GATE = """<script>
  if (sessionStorage.getItem("sh-authed") !== "1") {{
    window.location.href = "{root}index.html";
  }}
</script>"""


def fail(msg):
    sys.exit(f"build.py: {msg}")


def fetch_icons(names):
    missing = [n for n in names if not (ICONS / f"{n}.svg").exists()]
    if not missing:
        return
    ICONS.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["npm", "pack", f"lucide-static@{LUCIDE_VERSION}", "--silent"], cwd=tmp, check=True, capture_output=True)
        with tarfile.open(next(Path(tmp).glob("lucide-static-*.tgz"))) as tar:
            tar.extractall(tmp, filter="data")
        src = Path(tmp) / "package" / "icons"
        unknown = [n for n in missing if not (src / f"{n}.svg").exists()]
        if unknown:
            fail(f"not Lucide icons: {', '.join(unknown)} (browse https://lucide.dev/icons)")
        for n in missing:
            shutil.copy(src / f"{n}.svg", ICONS / f"{n}.svg")


def sprite(names):
    fetch_icons(names)
    out = []
    for n in sorted(set(names)):
        svg = (ICONS / f"{n}.svg").read_text()
        inner = re.search(r"<svg[^>]*>(.*)</svg>", svg, re.S).group(1)
        inner = re.sub(r"\s+", " ", inner).strip()
        out.append(f'  <symbol id="i-{n}" viewBox="0 0 24 24">{inner}</symbol>')
    return "\n".join(out)


def validate(t, path):
    def need(cond, msg):
        if not cond:
            fail(f"{path.name}: {msg}")

    for k in ["slug", "title", "noun", "fields", "questions", "items", "card"]:
        need(k in t, f"missing '{k}'")
    need(t["slug"] == path.stem, "slug must match the file name")
    keys = {f["key"] for f in t["fields"]}
    titles = [f for f in t["fields"] if f.get("role") == "title"]
    need(len(titles) == 1, "exactly one field needs role 'title'")
    need(sum(f.get("role") == "subtitle" for f in t["fields"]) <= 1, "at most one 'subtitle' field")
    for f in t["fields"]:
        need(f.get("role") in ("title", "subtitle", "meta"), f"field {f['key']}: role must be title/subtitle/meta")
    for k in t.get("hideable", []):
        need(k in keys, f"hideable '{k}' is not a field")
    for q in t["questions"]:
        need((q["from"] in keys or q["from"] == "image") and q["to"] in keys, f"question {q} uses an unknown field")
        need(q.get("ask"), f"question {q} needs an 'ask'")
    for m in t.get("match", []):
        need(m["left"] in keys and m["right"] in keys, f"match pair {m} uses an unknown field")
    groups = {g["key"] for g in t.get("groups", [])}
    seen = set()
    for it in t["items"]:
        name = it.get(titles[0]["key"])
        need(name, f"item without a {titles[0]['key']}: {it}")
        need(name not in seen, f"duplicate item '{name}'")
        seen.add(name)
        if it.get("image"):
            need((OUT / t["slug"] / it["image"]).exists(), f"'{name}' image not found: compendium/{t['slug']}/{it['image']}")
        if groups:
            need(it.get("group") in groups, f"'{name}' has unknown group {it.get('group')!r}")
    need(len(t["items"]) >= 4, "need at least 4 items for multiple choice to work")
    if "rhyme" in t:
        for line in t["rhyme"]["lines"]:
            for n in line["items"]:
                need(n in seen, f"rhyme line {line['text']!r} names unknown item {n!r}")
    if "map" in t:
        m = t["map"]
        need(m.get("key") in keys or all(m.get("key") in it for it in t["items"]),
             "map.key must be a field, or a property every item has")
        src = MAPS / f"{m.get('source')}.json"
        need(src.exists(), f"no map source {src.name} in maps/")
        shapes = json.loads(src.read_text())["shapes"]
        missing = [it[m["key"]] for it in t["items"] if it.get(m["key"]) not in shapes]
        need(not missing, f"no map shape for: {', '.join(map(str, missing))}")
        if m.get("label"):
            need(m["label"] in keys or all(m["label"] in it for it in t["items"]),
                 "map.label must be a field, or a property every item has")


def load_topics(only=None):
    paths = sorted(TOPICS.glob("*.json"))
    topics = []
    for p in paths:
        t = json.loads(p.read_text())
        validate(t, p)
        topics.append(t)
    if only:
        names = {t["slug"] for t in topics}
        for s in only:
            if s not in names:
                fail(f"no topic '{s}' in {TOPICS}")
    return topics


def as_script_json(obj):
    # safe inside <script type="application/json">
    return json.dumps(obj, ensure_ascii=False, indent=1).replace("</", "<\\/")


def map_json(t):
    if "map" not in t:
        return "null"
    m = json.loads((MAPS / f"{t['map']['source']}.json").read_text())
    wanted = {it[t["map"]["key"]] for it in t["items"]}
    if not m.get("context"):  # context maps draw every shape, so keep them all
        m["shapes"] = {k: v for k, v in m["shapes"].items() if k in wanted}
    return json.dumps(m, separators=(",", ":")).replace("</", "<\\/")


def inline_images(t):
    """A copy of the topic with every picture embedded as a data: URI, so a preview file
    works on its own (e.g. downloaded from chat) without its img/ folder beside it."""
    t = json.loads(json.dumps(t))
    kinds = {".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}
    for it in t["items"]:
        if it.get("image"):
            f = OUT / t["slug"] / it["image"]
            it["image"] = f"data:{kinds[f.suffix.lower()]};base64,{base64.b64encode(f.read_bytes()).decode()}"
    return t


def build_topic(t, out_dir, gate):
    if out_dir != OUT:
        t = inline_images(t)
    page = (SKILL / "template.html").read_text()
    icons = UI_ICONS + [it["icon"] for it in t["items"] if it.get("icon")] + ([t["defaultIcon"]] if t.get("defaultIcon") else [])
    page = (page.replace("{{PAGE_TITLE}}", html.escape(t["title"]))
                .replace("{{SLUG}}", t["slug"])
                .replace("{{GATE}}", GATE.format(root="../../") if gate else "")
                .replace("{{ICON_SPRITE}}", sprite(icons))
                .replace("{{DATA_JSON}}", as_script_json(t))
                .replace("{{MAP_JSON}}", map_json(t)))
    dest = out_dir / t["slug"] / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(page)
    img = OUT / t["slug"] / "img"
    if out_dir != OUT and img.is_dir():
        shutil.copytree(img, dest.parent / "img", dirs_exist_ok=True)
    return dest


def build_hub(topics, out_dir, gate):
    page = (SKILL / "hub-template.html").read_text()
    entries = []
    for t in sorted(topics, key=lambda t: t["card"].get("order", 999)):
        title_key = next(f["key"] for f in t["fields"] if f["role"] == "title")
        ids = [it.get("id") or re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", strip_accents(it[title_key].lower()))) for it in t["items"]]
        entries.append({**t["card"], "slug": t["slug"], "count": len(t["items"]), "noun": t["noun"]["many"], "ids": ids})
    icons = UI_ICONS + [e["icon"] for e in entries if e.get("icon")]
    page = (page.replace("{{GATE}}", GATE.format(root="../") if gate else "")
                .replace("{{ICON_SPRITE}}", sprite(icons))
                .replace("{{DATA_JSON}}", as_script_json(entries)))
    dest = out_dir / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(page)
    return dest


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="*", help="topics to rebuild (default: all)")
    ap.add_argument("--preview", metavar="DIR", help="write gate-free copies here instead of into the site")
    args = ap.parse_args()

    topics = load_topics(args.slugs)
    out_dir = Path(args.preview).resolve() if args.preview else OUT
    gate = not args.preview
    for t in topics:
        if not args.slugs or t["slug"] in args.slugs:
            print("wrote", build_topic(t, out_dir, gate).relative_to(out_dir.parent))
    print("wrote", build_hub(topics, out_dir, gate).relative_to(out_dir.parent))


if __name__ == "__main__":
    main()
