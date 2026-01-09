import Link from 'next/link';
import { TerminalWindow, SimplePrompt, Comment, String, Keyword } from '@/components/terminal';
import { FooterSection } from '@/components/sections';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params from archive data
export async function generateStaticParams() {
  try {
    const archiveData = await import('@/lib/archive-data.json');
    const issues = archiveData.default || archiveData;
    return issues.map((issue: { slug: string }) => ({
      slug: issue.slug,
    }));
  } catch {
    // Return sample slugs if archive-data.json doesn't exist yet
    return Array.from({ length: 20 }, (_, i) => ({
      slug: `issue-${420 - i}`,
    }));
  }
}

function formatArchiveDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

async function getIssueData(slug: string) {
  try {
    const archiveData = await import('@/lib/archive-data.json');
    const issues = archiveData.default || archiveData;
    return issues.find((issue: { slug: string }) => issue.slug === slug);
  } catch {
    // Parse slug to get issue number
    const match = slug.match(/issue-(\d+)/);
    if (match) {
      return {
        slug,
        number: parseInt(match[1], 10),
        date: '2024-01-01', // placeholder
      };
    }
    return null;
  }
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = await getIssueData(slug);

  if (!issue) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-syntax-constant mb-4">[ERROR] Issue not found</h1>
          <Link href="/archive" className="text-brand hover:underline">
            Return to archive
          </Link>
        </div>
      </main>
    );
  }

  const archiveUrl = `https://archive.0xcafe.news/${formatArchiveDate(issue.date)}`;

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/archive" className="text-brand hover:underline mb-4 inline-block">
            <span className="text-syntax-comment">{'<-'}</span> Back to archive
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="text-syntax-keyword">Issue</span>{' '}
            <span className="text-brand">#{issue.number}</span>
          </h1>
          <p className="text-terminal-text-muted mt-2">
            <Comment>// Published: {issue.date}</Comment>
          </p>
        </div>

        {/* Issue content */}
        <TerminalWindow
          title={`issue-${issue.number}.html`}
          className="terminal-glow"
        >
          <div className="space-y-4">
            <SimplePrompt>
              <Keyword>curl</Keyword> <String>{archiveUrl}</String>
            </SimplePrompt>

            <div className="relative w-full" style={{ height: '80vh' }}>
              <iframe
                src={archiveUrl}
                className="absolute inset-0 w-full h-full rounded bg-white"
                title={`Issue #${issue.number}`}
                loading="lazy"
              />
            </div>
          </div>
        </TerminalWindow>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {issue.number > 1 && (
            <Link
              href={`/archive/issue-${issue.number - 1}`}
              className="text-brand hover:underline"
            >
              <span className="text-syntax-comment">{'<-'}</span> Previous Issue
            </Link>
          )}
          <Link
            href={`/archive/issue-${issue.number + 1}`}
            className="text-brand hover:underline ml-auto"
          >
            Next Issue <span className="text-syntax-comment">{'->'}</span>
          </Link>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const issue = await getIssueData(slug);

  return {
    title: issue ? `Issue #${issue.number}` : 'Issue',
    description: issue ? `0xCAFE Newsletter Issue #${issue.number} - ${issue.date}` : '0xCAFE Newsletter Issue',
  };
}
