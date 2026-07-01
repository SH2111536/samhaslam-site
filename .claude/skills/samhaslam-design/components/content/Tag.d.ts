import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Small pill label for topics/categories" viewport="300x60"
 */
export interface TagProps {
  children: React.ReactNode;
  /** default = neutral outline, accent = blue outline+text for the primary topic. */
  tone?: 'default' | 'accent';
}
