import React from 'react';

export function Tag({ children, tone = 'default' }) {
  const styles = {
    default: { color: 'var(--text-muted)', border: 'var(--border-width) solid var(--border-default)' },
    accent: { color: 'var(--accent-400)', border: 'var(--border-width) solid var(--accent-700)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-meta)',
        letterSpacing: 'var(--ls-meta)',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        ...styles[tone],
      }}
    >
      {children}
    </span>
  );
}
