Button — the primary interactive control for CTAs, form submits, and inline actions.

```jsx
<Button variant="primary" onClick={submit}>Read the writing</Button>
<Button variant="secondary" as="a" href="/contact">Get in touch</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (solid accent, use once per view for the main action), `secondary` (outlined, for the paired secondary action), `ghost` (text-only, for low-emphasis actions like "Cancel"). Sizes: `md` (default) and `sm` (dense contexts). Set `as="a"` with `href` to render a link styled as a button. `disabled` mutes color and blocks interaction.
