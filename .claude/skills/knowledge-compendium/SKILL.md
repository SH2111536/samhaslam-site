---
name: knowledge-compendium
description: Build a learning page for Sam's knowledge compendium (samhaslam.co.uk/compendium) from a list, a photo of notes, or a topic to research — e.g. Roman gods and their areas, US states and capitals. Produces a page to browse the set, hide one side to self-test, take a quiz that targets weak spots, and play a matching game, in the site's design system. Use when Sam wants to learn or memorise a set of facts, or add/edit a compendium topic.
user-invocable: true
---

# Knowledge compendium

Each topic is one JSON file in `topics/`. `build.py` turns it into a page at
`compendium/<slug>/index.html` using the shared engine in `template.html`, and regenerates the
hub at `compendium/index.html` from every topic. Never hand-edit the generated HTML: change the
JSON (or the template, which upgrades every topic at once) and rebuild.

## Rule one: the content is Sam's

Sam decides what goes in. Don't pad a set with extra items, extra fields or "while we're at it"
material — a bigger set is harder to learn, and Sam may be learning the extra material
separately (Greek gods are their own topic, not a column on the Roman one).

1. **Gather.** Take the list as given, transcribe the photo, or — if asked to search — find the
   information and show the proposed list *before* building anything.
2. **Confirm before building.** Play back, briefly: the items, the fields per item ("name and
   area, plus symbol?"), and anything you'd add that Sam didn't ask for (symbols, groupings,
   memory hooks) as a question, not a decision. Wait for the answer.
3. **Flag, don't silently fix.** If an item looks wrong for the set (Hades in a Roman list is
   Pluto; a misspelling), say so, suggest the fix, and make it easy to reverse. Put a spelling
   variant in `accept` so typed answers still pass.
4. **Pace.** One topic at a time; show it and get a reaction before starting the next.

## Learning principles the page must serve

- **Retrieval beats re-reading.** Every page lets Sam hide one side of every card (tap to
  reveal one at a time), so browsing doubles as self-testing.
- **Both directions.** Ask god → area *and* area → god. Each `questions` entry is one direction.
- **Recognition, then recall.** The quiz offers multiple choice ("Choosing") and free typing
  ("Typing"); typing is only offered for fields marked `typeable` — short, spellable answers like
  names and capitals, never long descriptions. Typing tolerates a typo and accents.
- **Spend time on weak spots.** Progress is stored per item in the browser; the quiz and match
  game weight towards items not yet mastered (3 right in a row) and ones more often missed, and a
  round ends with "practise the ones I missed".
- **Short rounds.** 10 questions, 5 pairs per match by default (`roundLength`, `matchSize`).
- **Feedback teaches.** After every answer, show the full fact and the memory hook.
- **Hooks.** A one-line memory hook per item (etymology, a modern echo, a ridiculous image).
  Hooks are optional extras: offer them; once agreed, write them in Sam's voice — first person,
  dry, a little absurd, never twee. Keep facts in hooks accurate; when unsure, leave the hook out.
- **Pictures only where they earn their place.** Icons are optional and off by default. Use them
  when an image genuinely cues the meaning (a thunderbolt for the king of the gods), not as
  decoration on every topic. The best visual is often the real thing: a state's outline from the
  map, a painting's own picture. A plain list of names and capitals needs none. Ask Sam rather
  than assume.
- **Chunking.** For sets bigger than ~15, offer `groups` (regions, eras, families) so Sam can
  learn and test one chunk at a time. Only use groupings Sam agrees to.
- **Distractors that make you think.** Multiple-choice wrong answers come from the same field of
  other items, same group first. Keep values in a field parallel in style and length, so the
  right one doesn't stand out by being longer or differently phrased, and make each value unique.

## Design

Follow the `samhaslam-design` skill: dark "Dispatch" palette, one blue accent, Newsreader italic
for every headline and display value, Public Sans for everything else, sentence case, uppercase
only for short eyebrow labels, no emoji, Lucide icons only, borders not shadows, quiet motion.
The template already does all this; new visual ideas go into the template so every topic gets
them.

When a topic would be clearer with a bespoke visual (a map for states and capitals, a timeline
for monarchs), build it as an optional, data-driven section of the template (e.g. a `map` block
in the JSON), not a one-off page — and check with Sam first, since it's a bigger job.

## Topic JSON

```jsonc
{
  "slug": "roman-gods",                 // = file name; becomes the URL
  "title": "The Roman gods.",           // h1 (sentence case, full stop like other site headings)
  "eyebrow": "Compendium · Mythology",
  "lede": "One or two sentences, first person.",
  "noun": { "one": "god", "many": "gods" },
  "numerals": "roman",                  // card index style: "roman" | "arabic" (default) | "none"
  "card": { "tag": "Mythology", "title": "Roman gods", "desc": "Hub card line.", "icon": "zap", "order": 1 },
  "stats": [ { "value": "XII", "label": "in the council" } ],   // optional extra hero stats
  "fields": [
    // exactly one "title" (big italic name), at most one "subtitle", any number of "meta" rows
    { "key": "name", "label": "God", "plural": "gods", "role": "title", "typeable": true },
    { "key": "domain", "label": "Area", "plural": "areas", "role": "subtitle" },
    { "key": "symbol", "label": "Symbol", "short": "Symbol", "role": "meta" }
  ],
  "hideable": ["name", "domain"],       // one "Hide …" toggle each
  "questions": [                         // quiz directions; prompt shows `from`, answer is `to`
    { "from": "domain", "to": "name", "ask": "Which god is this?" },
    { "from": "name", "to": "domain", "ask": "What did they rule over?" }
  ],
  "match": [ { "left": "name", "right": "domain" } ],   // match-game pairings (first = default)
  "groups": [ { "key": "council", "label": "The twelve", "short": "The twelve", "note": "…" } ],  // optional
  "roundLength": 10, "matchSize": 5, "defaultIcon": "sparkles",   // optional
  "verdicts": { "perfect": "…", "good": "…", "okay": "…", "low": "…" },  // optional end-of-round lines
  "items": [
    { "name": "Jupiter", "domain": "King of the gods; sky and thunder", "symbol": "Eagle and thunderbolt",
      "icon": "zap", "group": "council",
      "accept": { "name": ["Jove"] },   // extra typed answers that count as right
      "hook": "One line, Sam's voice." }
  ]
}
```

### Maps

Add `"map": { "source": "us-states", "key": "state" }` (optional `"hint"` for the caption) and
the page gains a large map above the toolbar in place of the icon frieze. Each item is matched
to a shape by the value of its `key` field. The map shades items by mastery, dims those outside
the selected group, and shows name and subtitle on hover or tap (respecting the hide toggles).
Cards show the item's own outline instead of an icon, and quiz questions show a small map with
the item highlighted. When the question *asks* for the mapped field, the highlight waits until
after the answer, so it never gives the answer away.

Options: `"label": "<field>"` prints that field inside each shape (hidden along with the field);
`"cardShapes": false` keeps shapes off the cards when they say nothing (a square table cell);
`"withhold": false` shows the quiz highlight straight away, for maps where position doesn't give
the answer away. A source with `"context": true` (the periodic table) also draws the shapes
not in the topic, faintly, for shape.

Map sources live in `maps/<source>.json` as `{ viewBox, shapes: { name: { d, bbox } } }`, with
a generator script alongside (`make_us_states.js` from `us-atlas`, `make_periodic_table.py`). For a new kind of map
(world countries, UK counties), write a generator in the same shape, and check with Sam first.

### Pictures

An item can carry `"image": "img/<file>.jpg"`, stored in the site at
`compendium/<slug>/img/` (the build checks the file exists and copies it into previews). Once
any item has one, every card leads with a picture panel, shown whole on a dark mount and never
cropped. Items without a picture show their icon (if any) and `imageNote` (e.g. "Still in copyright")
instead. Add `{ "from": "image", "to": "<title field>", "ask": "Which work is this?" }` to
`questions` for a picture quiz; it skips items without a picture.

Only use images that are public domain or that Sam owns, and credit the source in `footer`.
Wikimedia Commons is the usual source: resize to about 800px on the long edge as JPEG
(Pillow is installed) to keep pages light. In the US, works published 95 or more years ago are
public domain; anything by an artist who died within the last 70 years probably isn't
(Picasso, Dalí).

A field can be `null` on an item (questions using it skip that item). Icons (`icon` on items,
`defaultIcon`) are optional: leave them out and cards go without an icon, and the strip of icons
under the title (which needs every item to have an icon or picture) is dropped. When used, they
are names from [lucide.dev/icons](https://lucide.dev/icons), which `build.py` fetches and
vendors into `icons/`. Pick icons that cue the *meaning*, and don't reuse one across items.

## Build, check, share

```bash
python3 .claude/skills/knowledge-compendium/build.py            # all topics + hub, into the site
python3 .claude/skills/knowledge-compendium/build.py roman-gods # one topic + hub
python3 .claude/skills/knowledge-compendium/build.py --preview <scratchpad>/preview   # no password gate
```

The site pages carry the same `sessionStorage` password check as `main/index.html`, so open a
`--preview` build to look at them locally. Before showing Sam:

1. Drive the preview with Playwright (installed globally under `/opt/node22`, Chromium at
   `/opt/pw-browsers`): load the page with no console errors, hide each field and reveal one,
   finish a quiz round in both answer modes, complete a match, and screenshot at 1280px and
   390px wide. Look at the screenshots.
2. Share the preview for Sam to try (send the preview HTML files to render, or publish a private
   artifact), and say what's new and what you'd like a decision on.

## Shipping

Sam's Netlify plan has a limited number of deploys, and every push to a branch with an open PR
costs one. **Do not commit or push compendium work until Sam says so**, and batch it: one commit
and one PR per session's worth of approved topics, not one per tweak. The first time the
compendium ships, make sure `main/index.html` (the site contents page) has a card linking to
`../compendium/index.html`.
