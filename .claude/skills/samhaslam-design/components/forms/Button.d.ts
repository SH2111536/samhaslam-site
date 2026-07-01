import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Primary, secondary and ghost buttons" viewport="700x220"
 */
export interface ButtonProps {
  /** Button label / contents */
  children: React.ReactNode;
  /** Visual treatment. Primary = solid accent, Secondary = outlined, Ghost = text-only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Sizing — md is default, sm for dense contexts (e.g. inline in a card). */
  size?: 'md' | 'sm';
  disabled?: boolean;
  /** Render as a link instead of a button. */
  as?: 'button' | 'a';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}
