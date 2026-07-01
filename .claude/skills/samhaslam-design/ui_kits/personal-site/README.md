# Personal Site UI Kit

Click-through recreation of samhaslam.co.uk's four sections, composed entirely from the
`components/` primitives (NavBar, Footer, Button, Input, TextArea, Tag, PostCard, SectionHeading).

- **Home.jsx** — hero (eyebrow, italic headline, subhead, two CTAs) + a "Latest writing" teaser.
- **About.jsx** — bio split into professional (risk/governance/AI) and personal notes, a headshot
  placeholder, and a "Speaking & talks" list.
- **Writing.jsx** — the blog index: a stack of `PostCard`s covering both professional essays and
  the odd personal/side-project post.
- **Contact.jsx** — short intro + a working (client-side only) contact form using `Input`,
  `TextArea`, `Button`.

`index.html` wraps all four in a single `NavBar` + `Footer` shell with simple React state for
routing — click a nav link or a CTA to switch screens. Content here is representative placeholder
copy; swap in Sam's real bio, talks and posts when the real site is built.
