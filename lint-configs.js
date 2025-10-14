import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ANSI escape codes for red text and underline
const BOLD_RED = '\x1b[1m\x1b[31m';
const RED = '\x1b[31m';
const UNDERLINE = '\x1b[4m';
const RESET = '\x1b[0m';

// Function to check the naming convention for config files
const checkConfigNamingConvention = (filename) => {
  // Regex pattern for kebab-case YAML files
  const kebabCasePattern = /^[a-z0-9]+(-[a-z0-9]+)*\.(yaml|yml)$/;
  return kebabCasePattern.test(filename)
    ? { valid: true }
    : { valid: false, reason: 'does not match the "kebab-case" pattern' };
};

// Counters for problems and errors
let problemCount = 0;
let errorCount = 0;

// Function to lint configs directory
const lintConfigs = (dir) => {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile() && (item.endsWith('.yaml') || item.endsWith('.yml'))) {
      const fileCheck = checkConfigNamingConvention(item);
      if (!fileCheck.valid) {
        console.log(
          `${UNDERLINE}${itemPath}${RESET}\n  ${RED}error${RESET}  The filename "${item}" ${fileCheck.reason}\n`
        );
        errorCount += 1; // Increment error count for file issues
      }
    }
  });
};

// Start checking the configs folder
lintConfigs(path.join(__dirname, 'src/configs'));

// Calculate total problems
problemCount = errorCount; // You can add other types of problems if necessary

// Print final feedback
if (problemCount > 0) {
  console.log(
    `${BOLD_RED}✖ ${problemCount} problem${problemCount !== 1 ? 's' : ''} (${errorCount} error${errorCount !== 1 ? 's' : ''}${RESET}`
  );
  process.exit(1); // Exit with error code to fail CI
} else {
  console.log('✓ All configs follow naming conventions');
}
