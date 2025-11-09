#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CONFLICT_MARKERS = ['<<<<<<<', '=======', '>>>>>>>'];
const IGNORE_DIRECTORIES = new Set([
  '.git',
  'node_modules',
  '.husky'
]);

const foundMarkers = [];

function isIgnoredDirectory(name) {
  return IGNORE_DIRECTORIES.has(name);
}

function walkDirectory(dirPath) {
  let entries;
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error) {
    console.error(`⚠️  Unable to read directory: ${dirPath}`);
    console.error(error.message);
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (!isIgnoredDirectory(entry.name)) {
        walkDirectory(fullPath);
      }
      continue;
    }

    if (entry.isFile()) {
      scanFile(fullPath);
    }
  }
}

function scanFile(filePath) {
  let data;
  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`⚠️  Unable to read file: ${filePath}`);
    console.error(error.message);
    return;
  }

  const lines = data.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const marker of CONFLICT_MARKERS) {
      if (line.startsWith(marker)) {
        foundMarkers.push({
          filePath,
          marker,
          line: index + 1
        });
      }
    }
  });
}

walkDirectory(process.cwd());

if (foundMarkers.length > 0) {
  console.error('❌ Merge conflict markers detected:');
  for (const markerInfo of foundMarkers) {
    console.error(`- ${path.relative(process.cwd(), markerInfo.filePath)}: ${markerInfo.marker} @ line ${markerInfo.line}`);
  }
  process.exitCode = 1;
} else {
  console.log('✅ Merge markers removed. File is clean and consistent.');
}
