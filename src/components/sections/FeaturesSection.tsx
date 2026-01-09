'use client';

import { motion } from 'framer-motion';
import { TerminalWindow, SimplePrompt, Comment, String, Keyword, Number as SyntaxNumber } from '@/components/terminal';
import { features } from '@/lib/content';

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-syntax-keyword">const</span>{' '}
            <span className="text-syntax-variable">features</span>{' '}
            <span className="text-terminal-text">=</span>{' '}
            <span className="text-syntax-function">[</span>
          </h2>
          <p className="text-terminal-text-muted">
            <Comment>// What you get in every issue</Comment>
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Closing bracket */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <span className="text-syntax-function text-3xl">]</span>
          <span className="text-terminal-text text-3xl">;</span>
        </motion.div>
      </div>
    </section>
  );
}

interface Feature {
  command: string;
  title: string;
  subtitle: string;
  examples: string[];
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TerminalWindow
        title={`feature-${index + 1}.sh`}
        className="h-full hover:shadow-terminal-glow transition-shadow duration-300"
        animate={false}
      >
        <div className="space-y-3">
          {/* Command */}
          <SimplePrompt>
            <Keyword>{feature.command}</Keyword>
          </SimplePrompt>

          {/* Title */}
          <h3 className="text-xl font-bold text-terminal-text">{feature.title}</h3>

          {/* Subtitle */}
          <p className="text-terminal-text-muted text-sm">{feature.subtitle}</p>

          {/* Examples */}
          <div className="space-y-1 pt-2">
            <div className="text-syntax-comment text-sm">// Recent examples:</div>
            {feature.examples.slice(0, 3).map((example, i) => (
              <div key={i} className="text-sm text-terminal-text-muted pl-2 truncate">
                <span className="text-syntax-string">•</span> {example}
              </div>
            ))}
          </div>

          {/* Link to archive */}
          <a
            href="/archive"
            className="inline-flex items-center gap-2 text-brand hover:underline text-sm mt-2"
          >
            <span className="text-syntax-function">{'->'}</span>
            <span>Browse archive</span>
          </a>
        </div>
      </TerminalWindow>
    </motion.div>
  );
}
