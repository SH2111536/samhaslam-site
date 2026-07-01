import React from 'react';
import { Tag } from '../content/Tag.jsx';

export function PostCard({ title, excerpt, date, tag, href = '#' }) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '24px 0',
        borderBottom: 'var(--border-width) solid var(--border-subtle)',
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {tag && <Tag tone="accent">{tag}</Tag>}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-meta)',
            color: 'var(--text-faint)',
          }}
        >
          {date}
        </span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 'var(--fw-medium)',
          fontSize: 'var(--fs-display-0)',
          lineHeight: 'var(--lh-display-0)',
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </div>
      {excerpt && (
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-sm)',
            lineHeight: 'var(--lh-body-sm)',
            color: 'var(--text-secondary)',
            maxWidth: 'var(--measure-prose)',
          }}
        >
          {excerpt}
        </p>
      )}
    </a>
  );
}
