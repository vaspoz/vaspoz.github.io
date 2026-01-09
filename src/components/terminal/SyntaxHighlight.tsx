'use client';

import { ReactNode } from 'react';

interface SyntaxProps {
  children: ReactNode;
  className?: string;
}

export function Keyword({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-keyword ${className}`}>{children}</span>;
}

export function String({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-string ${className}`}>{children}</span>;
}

export function Function({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-function ${className}`}>{children}</span>;
}

export function Comment({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-comment ${className}`}>{children}</span>;
}

export function Number({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-number ${className}`}>{children}</span>;
}

export function Constant({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-constant ${className}`}>{children}</span>;
}

export function Variable({ children, className = '' }: SyntaxProps) {
  return <span className={`text-syntax-variable ${className}`}>{children}</span>;
}

export function Brand({ children, className = '' }: SyntaxProps) {
  return <span className={`text-brand ${className}`}>{children}</span>;
}
