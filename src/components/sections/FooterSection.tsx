'use client';

import Link from 'next/link';
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
import { Comment, String } from '@/components/terminal';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-terminal-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-xl font-bold text-brand">{SITE_CONFIG.title}</div>
            <p className="text-terminal-text-muted text-sm">
              {SITE_CONFIG.tagline}
            </p>
            <div className="text-syntax-comment text-sm">
              // Made with ❤️ in Netherlands
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div className="text-syntax-keyword font-semibold">Links</div>
            <nav className="space-y-2">
              <Link href="/archive" className="block text-terminal-text-muted hover:text-brand transition-colors">
                <String>./archive</String>
              </Link>
              <Link href="/privacy" className="block text-terminal-text-muted hover:text-brand transition-colors">
                <String>./privacy</String>
              </Link>
              <a
                href={SOCIAL_LINKS.kofi}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-terminal-text-muted hover:text-brand transition-colors"
              >
                <String>./buy-me-coffee</String>
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <div className="text-syntax-keyword font-semibold">Connect</div>
            <nav className="space-y-2">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-terminal-text-muted hover:text-brand transition-colors"
              >
                <Comment>// X (Twitter)</Comment>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-terminal-text-muted hover:text-brand transition-colors"
              >
                <Comment>// LinkedIn</Comment>
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-terminal-text-muted hover:text-brand transition-colors"
              >
                <Comment>// Telegram</Comment>
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-terminal-border text-center">
          <p className="text-terminal-text-muted text-sm">
            <span className="text-syntax-comment">{`/* ${currentYear} ${SITE_CONFIG.title} - All rights reserved */`}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
