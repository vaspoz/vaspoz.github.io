const fs = require('fs');
const path = require('path');

// Folder containing the HTML files (downloaded from S3)
const archiveDir = path.join(__dirname, 'archive');

// Output path for the JSON data
const outputPath = path.join(__dirname, '../src/lib/archive-data.json');

// Ensure the archive directory exists
if (!fs.existsSync(archiveDir)) {
  console.log('No archive directory found. Creating sample data...');

  // Create sample data for development
  const sampleData = Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      slug: `issue-${420 - i}`,
      number: 420 - i,
      date: date.toISOString().split('T')[0],
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2));
  console.log('Sample archive data generated:', outputPath);
  process.exit(0);
}

// Read all HTML files from the directory
const htmlFiles = fs
  .readdirSync(archiveDir)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => file !== 'latest.html'); // Skip latest.html

// Parse the date from the file name to an actual date object for sorting
const parseDate = (filename) => {
  const dateStr = filename.replace('.html', '');
  return new Date(dateStr);
};

// Sort the files by date ascending
const sortedHtmlFiles = htmlFiles.sort((a, b) => parseDate(a) - parseDate(b));

// Generate archive data
const archiveData = sortedHtmlFiles.map((file, index) => {
  const date = file.replace('.html', '');
  const issueNumber = index + 1;

  return {
    slug: `issue-${issueNumber}`,
    number: issueNumber,
    date: date,
  };
});

// Reverse to show newest first
archiveData.reverse();

// Write the JSON file
fs.writeFileSync(outputPath, JSON.stringify(archiveData, null, 2));

console.log(`Generated archive data with ${archiveData.length} issues`);
console.log(`Output: ${outputPath}`);
