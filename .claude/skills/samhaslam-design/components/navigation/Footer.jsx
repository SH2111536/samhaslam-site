import React from 'react';

export function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 0',
        marginTop: 'var(--space-16)',
        borderTop: 'var(--border-width) solid var(--border-subtle)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-meta)',
        color: 'var(--text-faint)',
      }}
    >
      <span>© 2026 Sam Haslam</span>
      <div style={{ display: 'flex', gap: 20 }}>
        <a href="https://linkedin.com" style={{ color: 'var(--text-faint)', textDecoration: 'none' }}>
          LinkedIn
        </a>
        <a href="https://x.com" style={{ color: 'var(--text-faint)', textDecoration: 'none' }}>
          X
        </a>
        <a href="mailto:hello@samhaslam.co.uk" style={{ color: 'var(--text-faint)', textDecoration: 'none' }}>
          Email
        </a>
      </div>
    </footer>
  );
}
