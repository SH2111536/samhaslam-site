TextArea — multi-line field for the contact form's message body.

```jsx
<TextArea label="Message" rows={6} placeholder="What's on your mind?" value={msg} onChange={(e) => setMsg(e.target.value)} />
```

Same visual language as `Input` (label, border, focus ring) but resizable vertically.
