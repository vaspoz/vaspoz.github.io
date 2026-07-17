const fs = require('fs');
const path = require('path');

const ARCHIVE_BASE_URL = 'https://archive.0xcafe.news';
const outputPath = path.join(__dirname, '../src/lib/feature-examples.json');

// Parse archive date format "2-Jan-2026" to Date object
function parseArchiveDate(dateStr) {
  const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const match = dateStr.match(/(\d+)-([A-Za-z]+)-(\d+)/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(parseInt(year), months[month], parseInt(day));
  }
  return null;
}

// Format date as "2-Jan-2026"
function formatArchiveDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Get the latest issue date from /latest endpoint
async function getLatestIssueDate() {
  try {
    const response = await fetch(`${ARCHIVE_BASE_URL}/latest`);
    const html = await response.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) {
      return parseArchiveDate(titleMatch[1]);
    }
  } catch (err) {
    console.error('Failed to fetch latest:', err.message);
  }
  return null;
}

// Fetch and parse a newsletter
async function fetchNewsletter(date) {
  const dateStr = formatArchiveDate(date);
  const url = `${ARCHIVE_BASE_URL}/${dateStr}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

// Decode the HTML entities the archive emits in link text
function decodeEntities(str) {
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

// The archive delimits each section with HTML comments. Return the markup
// between a start and end marker, or null when the section is absent.
function sliceSection(html, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start === -1) return null;
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (end === -1) return null;
  return html.slice(start + startMarker.length, end);
}

// Strip tags from a chunk and return its non-trivial text runs, in order.
function textRuns(chunk) {
  if (!chunk) return [];
  return chunk
    .split(/<[^>]+>/)
    .map(part => decodeEntities(part).replace(/\s+/g, ' ').trim())
    .filter(text => text.length > 2);
}

// Extract news headlines from newsletter HTML
function extractNews(html) {
  const news = [];
  // Match links to news sites with their text
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi;
  let match;

  const newsDomains = ['theguardian', 'techcrunch', 'theverge', 'arstechnica', 'wired', 'bbc', 'reuters', 'bloomberg', 'engadget', 'cnet', 'zdnet', 'gizmodo'];

  while ((match = linkRegex.exec(html)) !== null) {
    const [, url, text] = match;
    const decodedUrl = url.replace(/&#x2F;/g, '/');
    const cleanText = decodeEntities(text.trim());

    // Skip short text, unsubscribe links, and github links
    if (cleanText.length < 20) continue;
    if (decodedUrl.includes('UNSUB') || decodedUrl.includes('mailto:')) continue;
    if (decodedUrl.includes('github.com')) continue;

    // Check if it's from a news domain
    if (newsDomains.some(domain => decodedUrl.includes(domain))) {
      news.push(cleanText);
    }
  }

  return news;
}

// Extract GitHub repos from newsletter HTML
function extractRepos(html) {
  const repos = [];
  // Decode HTML entities first
  const decodedHtml = html.replace(/&#x2F;/g, '/');
  const repoRegex = /<a[^>]*href="https?:\/\/github\.com\/([^\/\s"]+\/[^\/\s"]+)"[^>]*>([^<]*)<\/a>/gi;
  let match;

  while ((match = repoRegex.exec(decodedHtml)) !== null) {
    const [, repoPath, text] = match;
    // Skip if it's an issue/PR link
    if (repoPath.includes('/issues') || repoPath.includes('/pull')) continue;

    // Clean up repo path
    const cleanRepo = repoPath.replace(/["\s#].*/g, '');
    if (cleanRepo.includes('/') && !cleanRepo.includes('/issues') && !cleanRepo.includes('/pull')) {
      repos.push(cleanRepo);
    }
  }

  // Remove duplicates
  return [...new Set(repos)];
}

// Extract the trivia line from the "Useless Fact of the Day" section
function extractUselessFact(html) {
  const runs = textRuns(sliceSection(html, '<!-- useless fact section -->', '<!-- /useless fact section -->'));
  // Runs are [heading, fact]; the heading carries the emoji title.
  const fact = runs.find(text => !/Useless Fact of the Day/i.test(text));
  return fact ? [fact] : [];
}

// Extract the event blurb from the "This Day in History" section
function extractHistory(html) {
  const runs = textRuns(sliceSection(html, '<!-- history event body -->', '<!-- /This Day in History section -->'));
  const event = runs.find(text => !/^Read more on Wikipedia$/i.test(text) && text.length > 30);
  return event ? [event] : [];
}

// Extract the numbered tip from the "Corporate Sabotage 101" section
function extractSabotage(html) {
  const runs = textRuns(
    sliceSection(html, '<!-- Corporate Sabotage 101 section -->', '<!-- /Corporate Sabotage 101 section -->')
  );
  const tipIndex = runs.findIndex(text => /^Tip #\d+:?$/i.test(text));
  if (tipIndex === -1 || !runs[tipIndex + 1]) return [];
  return [`${runs[tipIndex].replace(/:$/, '')}: ${runs[tipIndex + 1]}`];
}

async function main() {
  console.log('Fetching feature examples from recent newsletters...');

  const latestDate = await getLatestIssueDate();
  if (!latestDate) {
    console.error('Could not determine latest issue date');
    process.exit(1);
  }

  console.log(`Latest issue: ${formatArchiveDate(latestDate)}`);

  // One entry per feature card on the site, in display order
  const categories = {
    uselessFacts: extractUselessFact,
    history: extractHistory,
    news: extractNews,
    sabotage: extractSabotage,
    repos: extractRepos,
  };
  const collected = Object.fromEntries(Object.keys(categories).map(key => [key, []]));

  // Fetch last 5 newsletters to get diverse examples
  const current = new Date(latestDate);
  let fetched = 0;
  let daysBack = 0;

  while (fetched < 5 && daysBack < 14) {
    const html = await fetchNewsletter(current);
    if (html) {
      console.log(`  Parsing ${formatArchiveDate(current)}...`);

      for (const [key, extract] of Object.entries(categories)) {
        collected[key].push(...extract(html));
      }

      fetched++;
    }
    current.setDate(current.getDate() - 1);
    daysBack++;
  }

  // Remove duplicates and take top examples
  const output = { updatedAt: new Date().toISOString() };
  for (const key of Object.keys(categories)) {
    output[key] = [...new Set(collected[key])].slice(0, 5);
  }

  const summary = Object.keys(categories)
    .map(key => `${output[key].length} ${key}`)
    .join(', ');
  console.log(`\nFound: ${summary}`);

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Output: ${outputPath}`);
}

main().catch(console.error);
