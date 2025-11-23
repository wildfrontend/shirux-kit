#!/usr/bin/env node

/**
 * Post-process generated icon components to handle dual-color support
 *
 * This script transforms data-color attributes into dynamic color props:
 * - data-color="primary" → fill={primaryColor} or stroke={primaryColor}
 * - data-color="secondary" → fill={secondaryColor || primaryColor}
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_ROOT = join(__dirname, '../src');

/**
 * Check if a file is a logo icon (should not support color changing)
 */
function isLogoIcon(filePath) {
  return filePath.includes('/logo/');
}

/**
 * Remove dual-color support from logo icons
 */
async function removeDualColorSupport(filePath) {
  let content = await readFile(filePath, 'utf-8');

  // Replace DualColorIconProps with standard SVGProps
  content = content.replace(
    /\/\/ Extended props for dual-color support\nexport interface DualColorIconProps extends SVGProps<SVGSVGElement> \{\n  primaryColor\?: string;\n  secondaryColor\?: string;\n\}\nconst (\w+) = \(\{\n  primaryColor = "currentColor",\n  secondaryColor = "transparent",\n  \.\.\.props\n\}: DualColorIconProps\)/,
    'const $1 = (props: SVGProps<SVGSVGElement>)'
  );

  // Remove fill="currentColor" from root SVG if it exists (logos have their own colors)
  content = content.replace(
    /(<svg[^>]*?) fill="currentColor"/,
    '$1'
  );

  await writeFile(filePath, content, 'utf-8');
  console.log(`✓ Removed dual-color support from logo: ${filePath}`);
  return true;
}

/**
 * Process a single icon file
 */
async function processFile(filePath) {
  let content = await readFile(filePath, 'utf-8');
  let modified = false;

  // Check if file has data-color attributes
  if (!content.includes('data-color=')) {
    return false;
  }

  console.log(`Processing: ${filePath}`);

  // Handle data-color="primary" - replace fill/stroke or add if missing
  // Pattern 1: Has fill attribute
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)fill="[^"]*"([^>]*?)data-color="primary"/g,
    '$1fill={primaryColor}$2'
  );

  // Pattern 2: Has stroke attribute
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)stroke="[^"]*"([^>]*?)data-color="primary"/g,
    '$1stroke={primaryColor}$2'
  );

  // Pattern 3: Has data-color but no fill/stroke - add fill
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)(data-color="primary")/g,
    (match, before, dataColor) => {
      // Check if already has fill or stroke
      if (before.includes('fill=') || before.includes('stroke=')) {
        return match;
      }
      return `${before}fill={primaryColor} ${dataColor}`;
    }
  );

  // Handle data-color="secondary" - replace fill/stroke or add if missing
  // Pattern 1: Has fill attribute
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)fill="[^"]*"([^>]*?)data-color="secondary"/g,
    '$1fill={secondaryColor}$2'
  );

  // Pattern 2: Has stroke attribute
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)stroke="[^"]*"([^>]*?)data-color="secondary"/g,
    '$1stroke={secondaryColor}$2'
  );

  // Pattern 3: Has data-color but no fill/stroke - add fill
  content = content.replace(
    /(<(?:path|circle|rect|ellipse|polygon|polyline|g)[^>]*?)(data-color="secondary")/g,
    (match, before, dataColor) => {
      // Check if already has fill or stroke
      if (before.includes('fill=') || before.includes('stroke=')) {
        return match;
      }
      return `${before}fill={secondaryColor} ${dataColor}`;
    }
  );

  // Check if any modifications were made
  if (content.includes('primaryColor') || content.includes('secondaryColor')) {
    modified = true;
  }

  // Clean up remaining data-color attributes
  content = content.replace(/\s*data-color="(?:primary|secondary)"/g, '');

  if (modified) {
    await writeFile(filePath, content, 'utf-8');
    console.log(`✓ Updated: ${filePath}`);
    return true;
  }

  return false;
}

/**
 * Process all icon files in a directory
 */
async function processDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    const tsxFiles = files.filter(file => file.endsWith('.tsx') && file !== 'index.tsx');

    let processedCount = 0;
    for (const file of tsxFiles) {
      const filePath = join(dirPath, file);

      // Handle logo icons separately (remove dual-color support)
      if (isLogoIcon(filePath)) {
        const wasModified = await removeDualColorSupport(filePath);
        if (wasModified) processedCount++;
        continue;
      }

      // Normal dual-color processing
      const wasModified = await processFile(filePath);
      if (wasModified) processedCount++;
    }

    return processedCount;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Directory not found: ${dirPath}`);
      return 0;
    }
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Post-processing dual-color icons...\n');

  // 動態偵測 src 下的子目錄（排除自動產生的 lucide）
  let targetDirs = [];
  try {
    const entries = await readdir(SRC_ROOT, { withFileTypes: true });
    targetDirs = entries
      .filter(entry => entry.isDirectory() && entry.name !== 'lucide')
      .map(entry => join(SRC_ROOT, entry.name));
  } catch (error) {
    console.error('❌ Cannot read src directory:', error.message);
    process.exit(1);
  }

  if (targetDirs.length === 0) {
    console.log('⚠️  No icon directories found to process.');
    return;
  }

  let totalProcessed = 0;
  for (const dir of targetDirs) {
    const count = await processDirectory(dir);
    totalProcessed += count;
  }

  console.log(`\n✨ Done! Processed ${totalProcessed} dual-color icon(s).`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
