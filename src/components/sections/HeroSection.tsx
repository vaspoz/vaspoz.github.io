'use client';

import { motion } from 'framer-motion';
import { TerminalWindow, TypeWriter, SimplePrompt, Keyword, String, Comment } from '@/components/terminal';
import { MailchimpForm } from '@/components/forms/MailchimpForm';

const ASCII_LOGO = `
   ██████╗ ██╗  ██╗ ██████╗ █████╗ ███████╗███████╗
  ██╔═████╗╚██╗██╔╝██╔════╝██╔══██╗██╔════╝██╔════╝
  ██║██╔██║ ╚███╔╝ ██║     ███████║█████╗  █████╗
  ████╔╝██║ ██╔██╗ ██║     ██╔══██║██╔══╝  ██╔══╝
  ╚██████╔╝██╔╝ ██╗╚██████╗██║  ██║██║     ███████╗
   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝
`;

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full space-y-8">
        {/* ASCII Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <pre className="ascii-art text-brand font-bold inline-block text-left">
            {ASCII_LOGO}
          </pre>
        </motion.div>

        {/* Main Terminal Window */}
        <TerminalWindow title="~/0xcafe — welcome.sh" className="terminal-glow">
          <div className="space-y-4">
            {/* Welcome message */}
            <SimplePrompt>
              <Keyword>cat</Keyword> <String>welcome.txt</String>
            </SimplePrompt>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pl-4 border-l-2 border-terminal-border space-y-2"
            >
              <p className="text-2xl sm:text-3xl font-bold">
                <span className="text-terminal-text">Tech & Science </span>
                <span className="text-brand">Newsletter</span>
              </p>
              <p className="text-terminal-text-muted">
                Your daily dose of curated tech news, trending repos,
                must-read articles, and engineering insights.
              </p>
              <p className="text-terminal-text-muted">
                <Comment>// Delivered 5 days/week. 600+ issues sent.</Comment>
              </p>
            </motion.div>

            {/* Signup form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-4"
            >
              <div className="mb-3">
                <SimplePrompt>
                  <Comment># Start your subscription</Comment>
                </SimplePrompt>
              </div>
              <MailchimpForm />
            </motion.div>
          </div>
        </TerminalWindow>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          <Stat value="1,247+" label="subscribers" />
          <Stat value="600+" label="issues sent" />
          <Stat value="5" label="days/week" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold text-brand">{value}</div>
      <div className="text-terminal-text-muted text-sm">{label}</div>
    </div>
  );
}
