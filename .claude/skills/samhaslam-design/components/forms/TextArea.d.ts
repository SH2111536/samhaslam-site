import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Multi-line text field for forms" viewport="360x150"
 */
export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
