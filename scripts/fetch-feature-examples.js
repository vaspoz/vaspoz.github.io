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
    const cleanText = text.trim();

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

// Extract articles - look for links from article sites
function extractArticles(html) {
  const articles = [];
  // Normalize whitespace to handle multiline HTML
  const normalizedHtml = html.replace(/\s+/g, ' ');
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a/gi;
  let match;

  const articleDomains = ['medium.com', 'dev.to', 'hashnode', 'substack', 'freecodecamp', 'hackernoon', 'dzone', 'infoq'];

  while ((match = linkRegex.exec(normalizedHtml)) !== null) {
    const [, url, text] = match;
    // Decode URL entities
    const decodedUrl = url.replace(/&#x2F;/g, '/');
    const cleanText = text.trim()
      .replace(/&quot;/g, '"')
      .replace(/&#x2F;/g, '/')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    if (cleanText.length < 20) continue;
    if (decodedUrl.includes('UNSUB') || decodedUrl.includes('mailto:')) continue;
    if (decodedUrl.includes('github.com')) continue;

    // Check for article patterns
    if (articleDomains.some(domain => decodedUrl.includes(domain))) {
      articles.push(cleanText);
    }
  }

  return articles;
}

async function main() {
  console.log('Fetching feature examples from recent newsletters...');

  const latestDate = await getLatestIssueDate();
  if (!latestDate) {
    console.error('Could not determine latest issue date');
    process.exit(1);
  }

  console.log(`Latest issue: ${formatArchiveDate(latestDate)}`);

  const allNews = [];
  const allArticles = [];
  const allRepos = [];

  // Fetch last 5 newsletters to get diverse examples
  const current = new Date(latestDate);
  let fetched = 0;
  let daysBack = 0;

  while (fetched < 5 && daysBack < 14) {
    const html = await fetchNewsletter(current);
    if (html) {
      console.log(`  Parsing ${formatArchiveDate(current)}...`);

      const news = extractNews(html);
      const articles = extractArticles(html);
      const repos = extractRepos(html);

      allNews.push(...news);
      allArticles.push(...articles);
      allRepos.push(...repos);

      fetched++;
    }
    current.setDate(current.getDate() - 1);
    daysBack++;
  }

  // Remove duplicates and take top examples
  const uniqueNews = [...new Set(allNews)].slice(0, 5);
  const uniqueArticles = [...new Set(allArticles)].slice(0, 5);
  const uniqueRepos = [...new Set(allRepos)].slice(0, 5);

  const output = {
    news: uniqueNews,
    articles: uniqueArticles,
    repos: uniqueRepos,
    updatedAt: new Date().toISOString(),
  };

  console.log(`\nFound: ${uniqueNews.length} news, ${uniqueArticles.length} articles, ${uniqueRepos.length} repos`);

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Output: ${outputPath}`);
}

main().catch(console.error);
