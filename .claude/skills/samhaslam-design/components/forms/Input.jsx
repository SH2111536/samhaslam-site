import React from 'react';

export function Input({ label, placeholder, type = 'text', value, onChange, name }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-body)' }}>
      {label && (
        <span
          style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--ls-meta)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-body-sm)',
          color: 'var(--text-primary)',
          background: 'var(--bg-surface)',
          border: 'var(--border-width) solid var(--border-default)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 12px',
          outline: 'none',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--focus-ring)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
      />
    </label>
  );
}
