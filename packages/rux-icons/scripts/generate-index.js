import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "../src");

// 確保 src 目錄存在
if (!fs.existsSync(SRC_DIR)) {
  console.error("❌ src directory not found!");
  process.exit(1);
}

// 轉換檔名為 PascalCase component 名稱 (保留 Icon 前綴)
const toPascalCase = (str) => {
  return str
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

const STYLE_SUFFIX_MAP = {
  fill: "",
  "two-tone": "TwoTone",
  outline: "Outline",
};

const getComponentName = (fileName, subdir) => {
  let baseName = toPascalCase(path.basename(fileName, ".tsx"));

  // For logo icons, remove the "Icon" prefix if it exists
  if (subdir === "logo" && baseName.startsWith("Icon")) {
    baseName = baseName.slice(4); // Remove "Icon" prefix
  }

  const suffix = STYLE_SUFFIX_MAP[subdir] ?? "";
  return `${baseName}${suffix}`;
};

// 為每個子目錄生成 index.ts
const subdirs = fs
  .readdirSync(SRC_DIR)
  .filter((item) => fs.statSync(path.join(SRC_DIR, item)).isDirectory());

let totalExports = 0;

for (const subdir of subdirs) {
  const subdirPath = path.join(SRC_DIR, subdir);
  const indexFile = path.join(subdirPath, "index.ts");

  const files = fs
    .readdirSync(subdirPath)
    .filter((file) => file.endsWith(".tsx") && file !== "index.tsx");

  if (files.length === 0) {
    console.warn(`⚠️  No .tsx files found in ${subdir} directory`);
    continue;
  }

  const exports = files
    .map((file) => {
      const componentName = getComponentName(file, subdir);
      const fileName = path.basename(file, ".tsx");
      return `export { default as ${componentName} } from "./${fileName}";`;
    })
    .sort()
    .join("\n");

  const content = `// Auto-generated file. Do not edit manually.\n${exports}\n`;
  fs.writeFileSync(indexFile, content);

  totalExports += files.length;
  console.log(`✅ Generated ${subdir}/index.ts with ${files.length} exports`);
}

console.log(`✨ Total: ${totalExports} component exports across ${subdirs.length} modules`);

// Generate Lucide icons re-exports
function generateLucideExports() {
  const lucideDir = path.join(SRC_DIR, "lucide");

  // Ensure lucide directory exists
  if (!fs.existsSync(lucideDir)) {
    fs.mkdirSync(lucideDir, { recursive: true });
  }

  // Generate a single index.ts file with export * from lucide-react
  const lucideIndexFile = path.join(lucideDir, "index.ts");
  const lucideIndexContent = `// Auto-generated file. Do not edit manually.
// Re-export all icons from lucide-react
// You can rename them when importing, e.g.: import { Heart as LHeart } from '@shirux/rux-icons/lucide'
// Tree-shaking is supported - only imported icons will be included in the bundle
export * from "lucide-react";
`;
  fs.writeFileSync(lucideIndexFile, lucideIndexContent);

  console.log(`✅ Generated lucide re-exports (all icons available with tree-shaking support)`);
}

// Run lucide generation
generateLucideExports();
