import * as React from 'react';

/**
 * @startingPoint section="Components" subtitle="Labelled text input for forms" viewport="360x90"
 */
export interface InputProps {
  /** Small uppercase label rendered above the field. */
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
