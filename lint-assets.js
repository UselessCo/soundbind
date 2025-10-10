import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Constants for file size limit
const BYTES_PER_KB = 1024;
const MAX_FILE_SIZE = 500 * BYTES_PER_KB; // 500 KB in bytes

// ANSI escape codes for red text and underline
const BOLD_RED = '\x1b[1m\x1b[31m';
const RED = '\x1b[31m';
const UNDERLINE = '\x1b[4m';
const RESET = '\x1b[0m';

// Function to check the naming convention for files
const checkFileNamingConvention = (filename) => {
  // Allow README.md files
  if (filename === 'README.md') {
    return { valid: true };
  }
  // Check if file has .mp3 extension
  if (!filename.endsWith('.mp3')) {
    return { valid: false, reason: 'Only .mp3 files are allowed' };
  }
  // Regex pattern for kebab-case MP3 files
  const kebabCasePattern = /^[a-z0-9]+(-[a-z0-9]+)*\.mp3$/;
  return kebabCasePattern.test(filename)
    ? { valid: true }
    : { valid: false, reason: 'does not match the "KEBAB_CASE" pattern' };
};

// Function to check the naming convention for directories
const checkFolderNamingConvention = (foldername) => {
  // Regex pattern for kebab-case
  const kebabCasePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return kebabCasePattern.test(foldername);
};

// Counters for problems and errors
let problemCount = 0;
let errorCount = 0;

// Function to lint assets directory
const lintAssets = (dir) => {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    // Ignore .DS_Store and any other unwanted files
    if (item === '.DS_Store') {
      return;
    }

    if (stats.isDirectory()) {
      // Check the folder naming convention
      if (!checkFolderNamingConvention(item)) {
        console.log(
          `${UNDERLINE}${itemPath}${RESET}\n  ${RED}error${RESET}  The folder name "${item}" does not match the "KEBAB_CASE" pattern\n`
        );
        errorCount += 1; // Increment error count for folder issues
      }
      lintAssets(itemPath); // Recursively lint subdirectories
    } else {
      const fileCheck = checkFileNamingConvention(item);
      if (!fileCheck.valid) {
        console.log(
          `${UNDERLINE}${itemPath}${RESET}\n  ${RED}error${RESET}  The filename "${item}" ${fileCheck.reason}\n`
        );
        errorCount += 1; // Increment error count for file issues
      }
      if (item.endsWith('.mp3') && stats.size > MAX_FILE_SIZE) {
        // Convert the file size from bytes to KB for readability
        const sizeKB = (stats.size / BYTES_PER_KB).toFixed(2);
        console.log(
          `${UNDERLINE}${itemPath}${RESET}\n  ${RED}error${RESET}  File size ${sizeKB} KB exceeds limit of 500 KB\n`
        );
        errorCount++;
      }
    }
  });
};

// Start checking the assets folder
lintAssets(path.join(__dirname, 'assets'));

// Calculate total problems
problemCount = errorCount; // You can add other types of problems if necessary

// Print final feedback
if (problemCount > 0) {
  console.log(
    `${BOLD_RED}✖ ${problemCount} problem${problemCount !== 1 ? 's' : ''} (${errorCount} error${errorCount !== 1 ? 's' : ''})${RESET}`
  );
  process.exit(1); // Exit with error code to fail CI
} else {
  console.log('✓ All assets follow naming conventions');
}
