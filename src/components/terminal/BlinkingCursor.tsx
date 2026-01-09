'use client';

interface BlinkingCursorProps {
  className?: string;
}

export function BlinkingCursor({ className = '' }: BlinkingCursorProps) {
  return (
    <span
      className={`inline-block w-2 h-5 bg-brand ml-1 animate-blink align-middle ${className}`}
      aria-hidden="true"
    />
  );
}
