const fs = require("fs");
const path = require("path");

// Folder containing the HTML files
const archiveDir = path.join(__dirname, "archive");

// Folder to store the markdown files
const outputDir = path.join(__dirname, "../blog");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read all HTML files from the directory
const htmlFiles = fs
  .readdirSync(archiveDir)
  .filter((file) => file.endsWith(".html"));

// Function to generate markdown content
const generateMarkdown = (issueNumber, date) => {
  return `---
slug: issue-${issueNumber}
title: "Issue #${issueNumber} (${date})"
authors: basil
date: ${date}
---
<IframeEmbed postfix="${date}"/>`;
};

// Parse the date from the file name to an actual date object for sorting
const parseDate = (filename) => {
  const dateStr = filename.replace(".html", "");
  return new Date(dateStr);
};

// Sort the files by date ascending
const sortedHtmlFiles = htmlFiles.sort((a, b) => parseDate(a) - parseDate(b));

// Process each HTML file to generate a corresponding markdown file
sortedHtmlFiles.forEach((file, index) => {
  const date = file.replace(".html", "");
  const issueNumber = index + 1;
  const markdownContent = generateMarkdown(issueNumber, date);

  // Markdown file name
  const markdownFileName = `Issue-${issueNumber}.md`;
  const markdownFilePath = path.join(outputDir, markdownFileName);

  // Write the markdown content to a new file
  fs.writeFileSync(markdownFilePath, markdownContent);

  console.log(`Generated ${markdownFileName} for ${file}`);
});

console.log(
  "Markdown files have been generated successfully in archive_output!",
);
