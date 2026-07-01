# Sam Haslam — Personal Site Design System

A from-scratch design system for **samhaslam.co.uk**, a personal site with two intertwined
purposes:

1. **Professional** — Sam's identity as an experienced risk, controls & governance professional
   specialising in AI, technology and enterprise risk. Writing on AI risk/governance, speaking
   engagement details, and eventually a consulting offering.
2. **Personal** — fun side-projects for an audience of friends and family. No bio/credentials
   needed here; a lighter register than the professional side.

There is no existing brand, codebase, or Figma file behind this — everything here was designed
from scratch through a short discovery conversation (vibe, color, type, references) and two
directional concepts the user chose between. Chosen direction: **"Dispatch"** — dark, editorial,
literary, blue accent (see `Design Directions.dc.html` at the project root for the rejected
"Signal" alternative and the original side-by-side comparison).

Reference the user pointed to for calibration (loose inspiration only, not copied):
[chrismatthews.co.uk](https://chrismatthews.co.uk/).

## Index

- `styles.css` — root stylesheet; import this one file to get every token + font.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/` — reusable UI primitives, grouped by concern:
  - `navigation/` — `NavBar`, `Footer`
  - `content/` — `SectionHeading`, `Tag`, `PostCard`
  - `forms/` — `Button`, `Input`, `TextArea`
- `ui_kits/personal-site/` — click-through recreation of the site: Home, About, Writing, Contact.
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, iconography, wordmark).
- `assets/icons/` — copied Lucide icon SVGs (`currentColor` stroke, so they inherit text color).

## Content fundamentals

**Two registers, one voice.** The professional side (home hero, about, writing on AI
risk/governance) is direct, confident, and precise — first person, active voice, no jargon
padding. E.g. *"I'm a risk, controls & governance professional focused on AI and technology
risk."* Short sentences over long ones. The personal side (side projects) can be looser and more
conversational, but never in third person and never twee.

**Casing & punctuation.** Sentence case everywhere — titles, nav labels, buttons. Eyebrows/labels
(e.g. "AI Governance", "Talks") are the one place we go uppercase, and only for short 1–3 word
tags/meta, always with slight letter-spacing.

**No emoji.** This is a professional-facing site first; emoji would undercut the "experienced risk
professional" positioning. Icons (see Iconography) do that job instead, sparingly.

**I, not "we."** Sam is one person — every page speaks in first person singular. No corporate
"we," no third-person bio-speak ("Sam is a...") on the About page; write as Sam, to the reader.

**Dates & meta.** Post dates render as `Mon YYYY` (e.g. "Jun 2026") — short, not clinical.

## Visual foundations

**Palette.** Cool near-black background (`oklch(0.15 0.01 250)`) with a single blue accent hue
carried through five lightness steps (700→300). No gradients, no second accent hue — restraint is
the point. Text uses four steps of the same cool-neutral scale (primary/secondary/muted/faint) so
hierarchy comes from lightness, not new colors.

**Type.** Two families only: **Newsreader** (italic, for every headline/display moment — this is
the signature move of the whole system) and **Public Sans** (upright, for everything functional:
body copy, nav, buttons, forms, meta). Never italicize body copy; never set a headline upright.

**Spacing.** 4px base scale (4/8/12/16/24/32/48/64/96). Page content caps at `--measure-page`
(1080px); prose/body columns cap at `--measure-prose` (640px) for readable line length.

**Backgrounds.** Flat and solid — no photography washes, no gradients, no textures/patterns. The
one placeholder texture (diagonal stripe, see `ImagePlaceholder` in the About screen) exists only
to mark *"a real photo goes here,"* not as a permanent visual motif.

**Radius.** Small and consistent: 4px (buttons/tags/inputs), 6px (cards), 10px (larger panels,
image placeholders), full pill (tags only).

**Borders vs. shadows.** Dark background, so elevation comes from a 1px border
(`--border-subtle`/`--border-default`) and a lightness step up (`--bg-surface` →
`--bg-surface-raised`), not drop shadow. `--shadow-float` exists for the rare floating element
(a dropdown) but the system otherwise has none.

**Hover / press states.** Buttons and nav links darken/lighten one accent step (500→400 on hover);
there is no scale/shrink on press — keep interactions quiet and editorial, not bouncy. Links get an
underline or accent-color shift, never a background fill.

**Motion.** Minimal by design — a personal/editorial site, not a product with onboarding
animation. `--duration-fast` (120ms) / `--duration-base` (200ms) with a standard ease, used only
for color transitions on hover. No page-transition choreography, no scroll-triggered reveals
defined yet.

**Imagery.** None shipped yet (no headshot, no photography) — the About screen uses a striped
placeholder labelled "HEADSHOT — drop photo here." When real photography is added: cool-toned,
uncropped-feeling, no heavy filter — should sit quietly next to the dark background rather than
fight it.

## Iconography

Icons come from **[Lucide](https://lucide.dev)** (MIT-licensed, outline/stroke style, `currentColor`
strokes) — copied into `assets/icons/` rather than linked from CDN so the set is self-contained.
Current set: `arrow-right`, `arrow-up-right` (external links / "read more"), `mail`, `menu`, `x`
(mobile nav open/close — not yet used in a screen, reserved for a future mobile nav). No emoji, no
unicode-symbol icons, no icon font — SVG only, sized at 18–22px, colored via `currentColor` so they
always match surrounding text color.

## Caveats & open questions

- No real content yet — bio copy, talk history, and blog posts in the UI kit are representative
  placeholders. Swap in real material before shipping.
- No logo mark beyond the italic wordmark + typographic monogram — flag if a distinct icon/logo is
  wanted.
- Mobile layout isn't designed yet (kit is desktop-width only); ask if you want a responsive pass.
- Component "cards" reference a generated `_ds_bundle.js` that this project's compiler produces
  automatically — if a card looks unstyled/broken before that finishes, give it a moment or
  re-open the Design System tab.
