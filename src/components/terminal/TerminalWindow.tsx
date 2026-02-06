'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
  animate?: boolean;
}

export function TerminalWindow({
  title = 'terminal',
  children,
  className = '',
  showControls = true,
  animate = true,
}: TerminalWindowProps) {
  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  } : {};

  return (
    <Wrapper
      className={`bg-terminal-bg border border-terminal-border rounded-lg shadow-terminal overflow-hidden ${className}`}
      {...animationProps}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-terminal-bg-secondary border-b border-terminal-border">
        {showControls && (
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-control-red" />
            <div className="w-3 h-3 rounded-full bg-control-yellow" />
            <div className="w-3 h-3 rounded-full bg-control-green" />
          </div>
        )}
        <span className="flex-1 text-center text-terminal-text-muted text-sm font-mono">
          {title}
        </span>
        {showControls && <div className="w-14" />} {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-terminal-text overflow-hidden">
        {children}
      </div>
    </Wrapper>
  );
}
