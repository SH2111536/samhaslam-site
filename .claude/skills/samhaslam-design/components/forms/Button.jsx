import React from 'react';

const sizes = {
  md: { padding: '11px 20px', fontSize: 'var(--fs-body-sm)' },
  sm: { padding: '7px 14px', fontSize: 'var(--fs-meta)' },
};

function variantStyle(variant, disabled) {
  if (disabled) {
    return {
      background: 'transparent',
      border: 'var(--border-width) solid var(--border-subtle)',
      color: 'var(--text-faint)',
      cursor: 'not-allowed',
    };
  }
  switch (variant) {
    case 'secondary':
      return {
        background: 'transparent',
        border: 'var(--border-width) solid var(--border-default)',
        color: 'var(--text-primary)',
      };
    case 'ghost':
      return {
        background: 'transparent',
        border: 'var(--border-width) solid transparent',
        color: 'var(--text-secondary)',
      };
    default:
      return {
        background: 'var(--accent)',
        border: 'var(--border-width) solid var(--accent)',
        color: 'var(--accent-text-on)',
      };
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  as = 'button',
  href,
  onClick,
}) {
  const Tag = as === 'a' ? 'a' : 'button';
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-medium)',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    transition: `background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)`,
    ...sizes[size],
    ...variantStyle(variant, disabled),
  };

  return (
    <Tag
      style={style}
      href={as === 'a' ? href : undefined}
      disabled={as === 'button' ? disabled : undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-hover)';
        if (variant === 'primary') e.currentTarget.style.borderColor = 'var(--accent-hover)';
        if (variant === 'secondary') e.currentTarget.style.background = 'var(--bg-hover)';
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent)';
        if (variant === 'primary') e.currentTarget.style.borderColor = 'var(--accent)';
        if (variant === 'secondary') e.currentTarget.style.background = 'transparent';
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {children}
    </Tag>
  );
}
