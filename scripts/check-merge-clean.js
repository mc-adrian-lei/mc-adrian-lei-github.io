#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const MARKERS = [
  { label: '<<<<<<<', test: (line) => line.startsWith('<<<<<<<') },
  { label: '=======', test: (line) => line.trim() === '=======' },
  { label: '>>>>>>>', test: (line) => line.startsWith('>>>>>>>') }
];
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.next', 'dist', 'build', 'tmp']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      files.push(...walk(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function checkFile(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const lines = contents.split(/\r?\n/);
  const offending = [];
  for (let i = 0; i < lines.length; i += 1) {
    for (const marker of MARKERS) {
      if (marker.test(lines[i])) {
        offending.push({ marker: marker.label, line: i + 1 });
        break;
      }
    }
  }
  return offending;
}

function collectTargets(root, inputs) {
  if (!inputs.length) {
    return walk(root);
  }
  const collected = [];
  for (const input of inputs) {
    const resolved = path.resolve(root, input);
    if (!fs.existsSync(resolved)) continue;
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      collected.push(...walk(resolved));
    } else if (stat.isFile()) {
      collected.push(resolved);
    }
  }
  return collected;
}

function main() {
  const root = process.cwd();
  const inputs = process.argv.slice(2);
  const pathsToCheck = collectTargets(root, inputs);
  const violations = [];

  for (const filePath of pathsToCheck) {
    const relative = path.relative(root, filePath);
    const offenderLines = checkFile(filePath);
    if (offenderLines.length) {
      violations.push({ file: relative, lines: offenderLines });
    }
  }

  if (violations.length) {
    console.error('❌ Merge markers still found. Manual cleanup required.');
    for (const { file, lines } of violations) {
      const details = lines.map(({ marker, line }) => `${marker} @ line ${line}`).join(', ');
      console.error(`  - ${file}: ${details}`);
    }
    process.exitCode = 1;
  } else {
    console.log('✅ Merge markers removed. File is clean and consistent.');
  }
}

main();
