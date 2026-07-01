import React from 'react';

export function NavBar({ current = 'home', onNavigate }) {
  const links = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'writing', label: 'Writing', href: '/writing' },
    { key: 'contact', label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 0',
        borderBottom: 'var(--border-width) solid var(--border-subtle)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 'var(--fw-semibold)',
          fontSize: 18,
          color: 'var(--text-primary)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Sam Haslam
      </a>
      <div style={{ display: 'flex', gap: 24 }}>
        {links.map((l) => (
          <a
            key={l.key}
            href={l.href}
            onClick={
              onNavigate
                ? (e) => {
                    e.preventDefault();
                    onNavigate(l.key);
                  }
                : undefined
            }
            style={{
              fontSize: 'var(--fs-body-sm)',
              fontWeight: 'var(--fw-medium)',
              color: l.key === current ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              borderBottom: l.key === current ? '1px solid var(--accent)' : '1px solid transparent',
              paddingBottom: 4,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
