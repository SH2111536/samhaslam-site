import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Eyebrow + italic serif heading" viewport="500x110"
 */
export interface SectionHeadingProps {
  /** Small uppercase accent-colored label above the heading. */
  eyebrow?: string;
  title: string;
  /** lg = hero/page-level sections, sm = sub-sections within a page. */
  size?: 'lg' | 'sm';
}
