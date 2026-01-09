'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TerminalWindow, SimplePrompt, Comment, Keyword, String } from '@/components/terminal';
import { CREATOR } from '@/lib/constants';
import { creatorStory } from '@/lib/content';

export function QuoteSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      emailInput?.focus();
    }, 500);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TerminalWindow title="~/about/README.md" className="terminal-glow">
            <div className="space-y-6">
              {/* Header */}
              <SimplePrompt>
                <Keyword>cat</Keyword> <String>README.md</String>
              </SimplePrompt>

              {/* Author card */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-terminal-bg-secondary rounded-lg border border-terminal-border">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand shrink-0">
                  <Image
                    src={CREATOR.avatar}
                    alt={CREATOR.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-terminal-text">{CREATOR.name}</h3>
                  <p className="text-syntax-comment">{`// ${CREATOR.subtitle}`}</p>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4">
                <div className="text-syntax-keyword text-lg"># My Story</div>
                {creatorStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-terminal-text-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-terminal-border">
                <SimplePrompt>
                  <Comment># Ready to join?</Comment>
                </SimplePrompt>
                <button
                  onClick={scrollToTop}
                  className="mt-4 px-6 py-3 bg-brand text-terminal-bg font-semibold rounded hover:bg-brand/90 transition-colors"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}
