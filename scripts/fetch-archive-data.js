const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../src/lib/archive-data.json');
const ARCHIVE_BASE_URL = 'https://archive.0xcafe.news';

// Format date as "26-Nov-2024"
function formatArchiveDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

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

// Format date as ISO "2024-11-26" (local timezone)
function formatISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if a date is a weekday (Mon-Fri)
function isWeekday(date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
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

// Check if archive exists for a given date
async function checkArchiveExists(date) {
  const dateStr = formatArchiveDate(date);
  const url = `${ARCHIVE_BASE_URL}/${dateStr}`;

  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

// Count weekdays between two dates (exclusive of start, inclusive of end for forward)
function countWeekdaysBetween(startDate, endDate) {
  let count = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Normalize to start of day
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (end > start) {
    const current = new Date(start);
    current.setDate(current.getDate() + 1);
    while (current <= end) {
      if (isWeekday(current)) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  } else {
    const current = new Date(start);
    while (current > end) {
      if (isWeekday(current)) count++;
      current.setDate(current.getDate() - 1);
    }
    return -count;
  }
}

// Calculate issue number based on reference point
function calculateIssueNumber(date, referenceDate, referenceIssue) {
  const weekdayDiff = countWeekdaysBetween(referenceDate, date);
  return referenceIssue + weekdayDiff;
}


async function main() {
  console.log('Fetching latest archive data...');

  // Known reference point: issue-420 = 2024-12-20
  const referenceIssue = 420;
  const referenceDate = new Date('2024-12-20');

  // Get the latest issue date from /latest endpoint
  const latestDate = await getLatestIssueDate();
  if (!latestDate) {
    console.error('Could not determine latest issue date');
    process.exit(1);
  }
  console.log(`Latest issue date: ${formatArchiveDate(latestDate)}`);

  const validIssues = [];
  const current = new Date(latestDate);

  // Go backwards from latest, checking each weekday
  let daysChecked = 0;
  while (validIssues.length < 10 && daysChecked < 60) {
    // Only check weekdays (newsletter is 5 days/week)
    if (isWeekday(current)) {
      const exists = await checkArchiveExists(current);
      if (exists) {
        // Calculate issue number based on weekday difference from reference
        const issueNumber = calculateIssueNumber(current, referenceDate, referenceIssue);

        validIssues.push({
          slug: `issue-${issueNumber}`,
          number: issueNumber,
          date: formatISODate(current),
        });

        console.log(`  Found: Issue #${issueNumber} (${formatArchiveDate(current)})`);
      }
    }
    current.setDate(current.getDate() - 1);
    daysChecked++;
  }

  // Sort by issue number descending
  validIssues.sort((a, b) => b.number - a.number);

  // Write output
  fs.writeFileSync(outputPath, JSON.stringify(validIssues, null, 2));
  console.log(`\nGenerated archive data with ${validIssues.length} issues`);
  console.log(`Output: ${outputPath}`);
}

main().catch(console.error);
