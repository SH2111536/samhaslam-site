import React from 'react';

export function SectionHeading({ eyebrow, title, size = 'lg' }) {
  const fs = size === 'lg' ? 'var(--fs-display-1)' : 'var(--fs-display-0)';
  const lh = size === 'lg' ? 'var(--lh-display-1)' : 'var(--lh-display-0)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {eyebrow && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--ls-meta)',
            textTransform: 'uppercase',
            color: 'var(--accent-400)',
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 'var(--fw-medium)',
          fontSize: fs,
          lineHeight: lh,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h2>
    </div>
  );
}
