const fs = require('fs');
const path = require('path');

/**
 * Recursively scans a directory and its subdirectories for JSON files
 * @param {string} dirPath - The directory path to scan
 * @param {Array} fileList - Array to store found JSON files (optional, for recursion)
 * @returns {Array} Array of objects containing file information
 */
function scanJsonFiles(dirPath, fileList = []) {
  try {
    // Read directory contents
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      
      try {
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          // Recursively scan subdirectories
          scanJsonFiles(filePath, fileList);
        } else if (stat.isFile() && path.extname(file).toLowerCase() === '.json') {
          // Found a JSON file
          const fileInfo = {
            path: filePath,
            name: file,
            size: stat.size,
            modified: stat.mtime,
            directory: dirPath
          };

          // Optionally read and validate JSON content
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            JSON.parse(content); // Validate JSON
            fileInfo.valid = true;
            fileInfo.lineCount = content.split('\n').length;
          } catch (parseError) {
            fileInfo.valid = false;
            fileInfo.error = parseError.message;
          }

          fileList.push(fileInfo);
        }
      } catch (err) {
        // Skip files/directories that can't be accessed
        console.error(`Error accessing ${filePath}:`, err.message);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err.message);
  }

  return fileList;
}

/**
 * Main function to run the JSON file scanner
 * @param {string} rootPath - Root directory to scan (defaults to current directory)
 */
function main(rootPath = process.cwd()) {
  console.log(`\nScanning for JSON files in: ${rootPath}\n`);
  console.log('='.repeat(60));

  const startTime = Date.now();
  const jsonFiles = scanJsonFiles(rootPath);
  const endTime = Date.now();

  // Display results
  if (jsonFiles.length === 0) {
    console.log('No JSON files found.');
  } else {
    console.log(`\nFound ${jsonFiles.length} JSON file(s):\n`);

    jsonFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}`);
      console.log(`   Path: ${file.path}`);
      console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
      console.log(`   Modified: ${file.modified.toLocaleString()}`);
      console.log(`   Valid JSON: ${file.valid ? '✓' : '✗'}`);
      if (file.lineCount) {
        console.log(`   Lines: ${file.lineCount}`);
      }
      if (file.error) {
        console.log(`   Error: ${file.error}`);
      }
      console.log('');
    });

    // Summary statistics
    const validFiles = jsonFiles.filter(f => f.valid).length;
    const invalidFiles = jsonFiles.filter(f => !f.valid).length;
    const totalSize = jsonFiles.reduce((sum, f) => sum + f.size, 0);

    console.log('='.repeat(60));
    console.log('Summary:');
    console.log(`  Total files: ${jsonFiles.length}`);
    console.log(`  Valid JSON: ${validFiles}`);
    console.log(`  Invalid JSON: ${invalidFiles}`);
    console.log(`  Total size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`  Scan time: ${endTime - startTime}ms`);
  }

  console.log('='.repeat(60));
  console.log('');

  return jsonFiles;
}

// Run the scanner
// Get directory path from command line arguments or use current directory
const targetPath = process.argv[2] || process.cwd();

// Resolve to absolute path
const absolutePath = path.resolve(targetPath);

// Check if path exists
if (!fs.existsSync(absolutePath)) {
  console.error(`Error: Path does not exist: ${absolutePath}`);
  process.exit(1);
}

// Check if it's a directory
const stat = fs.statSync(absolutePath);
if (!stat.isDirectory()) {
  console.error(`Error: Path is not a directory: ${absolutePath}`);
  process.exit(1);
}

// Execute the scanner
const results = main(absolutePath);
console.log(results);

// Export for use as a module
module.exports = { scanJsonFiles, main };
