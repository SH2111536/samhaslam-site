PostCard — one row in the Writing index: tag + date, italic serif title, optional excerpt. The whole row is a link.

```jsx
<PostCard
  tag="AI Governance"
  date="Jun 2026"
  title="Why governance frameworks lag behind model capability"
  excerpt="A look at the gap between how fast models ship and how slowly controls catch up."
  href="/writing/governance-lag"
/>
```

Stack several inside a plain list — each card supplies its own bottom border/divider, so no wrapping list styles are needed.
