'use client';

import { ReactNode } from 'react';

interface TerminalPromptProps {
  children: ReactNode;
  user?: string;
  path?: string;
  className?: string;
}

export function TerminalPrompt({
  children,
  user = 'guest',
  path = '~',
  className = '',
}: TerminalPromptProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <span className="text-syntax-string shrink-0">{user}@0xcafe</span>
      <span className="text-terminal-text-muted shrink-0">:</span>
      <span className="text-syntax-function shrink-0">{path}</span>
      <span className="text-terminal-text-muted shrink-0">$</span>
      <span className="text-terminal-text">{children}</span>
    </div>
  );
}

interface SimplePromptProps {
  children: ReactNode;
  prefix?: string;
  className?: string;
}

export function SimplePrompt({
  children,
  prefix = '$',
  className = '',
}: SimplePromptProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <span className="text-syntax-string shrink-0">{prefix}</span>
      <span className="text-terminal-text">{children}</span>
    </div>
  );
}
