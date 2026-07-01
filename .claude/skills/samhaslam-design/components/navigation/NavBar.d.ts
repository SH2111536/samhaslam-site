import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Site-wide nav with wordmark + section links" viewport="700x90"
 */
export interface NavBarProps {
  /** Which link to underline as active. */
  current?: 'home' | 'about' | 'writing' | 'contact';
  /** If provided, links call this with the link key instead of following href (for SPA-style routing). */
  onNavigate?: (key: 'home' | 'about' | 'writing' | 'contact') => void;
}
