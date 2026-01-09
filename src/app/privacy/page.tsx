import Link from 'next/link';
import { TerminalWindow, SimplePrompt, Comment, String, Keyword } from '@/components/terminal';
import { FooterSection } from '@/components/sections';
import { privacyPolicy } from '@/lib/content';
import { CREATOR } from '@/lib/constants';

export default function PrivacyPage() {
  // Parse markdown-like content to JSX
  const sections = privacyPolicy.split('\n\n').map((block, index) => {
    if (block.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl font-bold text-brand mb-6">
          {block.replace('# ', '')}
        </h1>
      );
    }
    if (block.startsWith('## ')) {
      return (
        <h2 key={index} className="text-xl font-bold text-syntax-keyword mt-8 mb-4">
          {block.replace('## ', '')}
        </h2>
      );
    }
    return (
      <p key={index} className="text-terminal-text-muted mb-4 leading-relaxed">
        {block}
      </p>
    );
  });

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-brand hover:underline mb-4 inline-block">
            <span className="text-syntax-comment">{'<-'}</span> Back to home
          </Link>
        </div>

        {/* Privacy content */}
        <TerminalWindow title="~/docs/PRIVACY.md" className="terminal-glow">
          <div className="space-y-4">
            <SimplePrompt>
              <Keyword>cat</Keyword> <String>PRIVACY.md</String>
            </SimplePrompt>

            <div className="pl-4 border-l-2 border-terminal-border">
              {sections}

              <div className="mt-8 pt-4 border-t border-terminal-border">
                <p className="text-terminal-text-muted">
                  <Comment>// Last updated: January 2024</Comment>
                </p>
                <p className="text-terminal-text-muted mt-2">
                  Contact: <a href={`mailto:${CREATOR.email}`} className="text-brand hover:underline">{CREATOR.email}</a>
                </p>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>

      <FooterSection />
    </main>
  );
}

export const metadata = {
  title: 'Privacy Policy',
  description: '0xCAFE Newsletter Privacy Policy',
};
