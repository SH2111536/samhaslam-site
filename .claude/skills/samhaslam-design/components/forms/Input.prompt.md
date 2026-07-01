Input — single-line text field with an optional uppercase label, used in the contact form.

```jsx
<Input label="Name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
```

Pair with `TextArea` for longer fields. Focus state swaps the border to the accent color; there is no separate error state defined yet — style TBD if validation is added.
