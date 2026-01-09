'use client';

import { useState, useRef } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { MAILCHIMP_URL } from '@/lib/constants';
import { BlinkingCursor } from '@/components/terminal';

interface FormProps {
  status: string | null;
  message: string | Error | null;
  onValidated: (data: { EMAIL: string }) => void;
}

function TerminalForm({ status, message, onValidated }: FormProps) {
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onValidated({ EMAIL: email });
    }
  };

  if (status === 'success') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-syntax-string">
          <span className="text-control-green">[SUCCESS]</span>
          <span>Subscription confirmed!</span>
        </div>
        <div className="text-terminal-text-muted">
          Check your inbox for the confirmation email.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="flex items-center gap-2 text-syntax-constant">
          <span>[ERROR]</span>
          <span
            dangerouslySetInnerHTML={{
              __html: typeof message === 'string' ? message : 'An error occurred',
            }}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-terminal-bg-secondary border border-terminal-border rounded px-3 py-2 focus-within:border-brand transition-colors">
          <span className="text-syntax-string shrink-0">$</span>
          <span className="text-syntax-keyword shrink-0">subscribe</span>
          <span className="text-terminal-text-muted shrink-0">--email</span>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 bg-transparent border-none outline-none text-terminal-text placeholder:text-terminal-text-muted min-w-0"
            required
            autoFocus
          />
          {!email && <BlinkingCursor />}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-2 bg-brand text-terminal-bg font-semibold rounded hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'sending' ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse">Processing...</span>
            </span>
          ) : (
            'Execute'
          )}
        </button>
      </div>

      <div className="text-terminal-text-muted text-sm">
        <span className="text-syntax-comment">// Join 1,247+ engineers. 5 days/week. No spam.</span>
      </div>
    </form>
  );
}

export function MailchimpForm() {
  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }) => (
        <TerminalForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
}
