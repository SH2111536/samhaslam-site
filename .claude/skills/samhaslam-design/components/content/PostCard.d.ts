import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="List row for a blog/writing entry" viewport="600x140"
 */
export interface PostCardProps {
  title: string;
  excerpt?: string;
  date: string;
  /** Single topic tag shown before the date. */
  tag?: string;
  href?: string;
}
