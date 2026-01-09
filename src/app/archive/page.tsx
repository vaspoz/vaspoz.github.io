import Link from 'next/link';
import { TerminalWindow, SimplePrompt, Comment, String, Keyword } from '@/components/terminal';
import { FooterSection } from '@/components/sections';

// This will be populated by the build script
async function getArchiveIssues() {
  // In production, this reads from generated JSON
  // For now, return placeholder data
  try {
    const archiveData = await import('@/lib/archive-data.json');
    return archiveData.default || archiveData;
  } catch {
    // Return sample data if archive-data.json doesn't exist yet
    return Array.from({ length: 20 }, (_, i) => ({
      slug: `issue-${420 - i}`,
      number: 420 - i,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }));
  }
}

export default async function ArchivePage() {
  const issues = await getArchiveIssues();

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-brand">./archive</span>
          </h1>
          <p className="text-terminal-text-muted">
            <Comment>// Browse all newsletter issues</Comment>
          </p>
        </div>

        {/* Archive listing */}
        <TerminalWindow title="~/archive — ls -la" className="terminal-glow">
          <div className="space-y-2">
            <SimplePrompt>
              <Keyword>ls</Keyword> <String>-la</String> ./issues/
            </SimplePrompt>

            <div className="text-terminal-text-muted text-sm mb-4">
              total {issues.length} issues
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 text-syntax-comment text-sm border-b border-terminal-border pb-2 mb-2">
              <div className="col-span-2">type</div>
              <div className="col-span-3">date</div>
              <div className="col-span-7">name</div>
            </div>

            {/* Issues list */}
            <div className="space-y-1 max-h-[60vh] overflow-y-auto">
              {issues.map((issue: { slug: string; number: number; date: string }) => (
                <Link
                  key={issue.slug}
                  href={`/archive/${issue.slug}`}
                  className="grid grid-cols-12 gap-2 text-sm hover:bg-terminal-bg-secondary px-2 py-1 rounded transition-colors group"
                >
                  <div className="col-span-2 text-syntax-keyword">-rw-r--r--</div>
                  <div className="col-span-3 text-syntax-number">{issue.date}</div>
                  <div className="col-span-7 text-syntax-string group-hover:text-brand transition-colors">
                    Issue-{issue.number}.md
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TerminalWindow>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-brand hover:underline">
            <SimplePrompt>
              <Keyword>cd</Keyword> <String>~</String>
            </SimplePrompt>
          </Link>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}

export const metadata = {
  title: 'Archive',
  description: 'Browse all 0xCAFE newsletter issues',
};
