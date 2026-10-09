import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const ignored = new Set([".git", ".playwright-cli", "node_modules"]);
const blockedNames = [/^\.env(\.|$)/i, /secret/i, /credential/i, /\.sqlite/i, /\.pem$/i, /\.key$/i, /\.docx$/i, /\.xlsx$/i, /\.log$/i];
const textExtensions = new Set([".md", ".json", ".js", ".mjs", ".html", ".css", ".yml", ".yaml", ".txt"]);
const blockedContent = [
  { name: "personal email", pattern: /[a-z0-9._%+-]+@gmail\.com/i },
  { name: "Google spreadsheet URL", pattern: /docs\.google\.com\/spreadsheets\/d\//i },
  { name: "Google Drive folder URL", pattern: /drive\.google\.com\/drive\/folders\//i },
  { name: "private network hostname", pattern: /tail[a-z0-9-]*\.ts\.net/i },
  { name: "local user path", pattern: /(?:[a-z]:\\Users\\|\/Users\/)[^/\\\s]+/i },
  { name: "Discord webhook", pattern: /discord(?:app)?\.com\/api\/webhooks\//i },
  { name: "private key material", pattern: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/i },
  { name: "OAuth client secret", pattern: /["']client_secret["']\s*:/i }
];

async function filesAt(directory) {
  const results = [];
  for (const entry of await readdir(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const metadata = await stat(path);
    if (metadata.isDirectory()) results.push(...await filesAt(path)); else results.push(path);
  }
  return results;
}

const files = await filesAt(root);
const failures = [];
for (const path of files) {
  const name = relative(root, path).replaceAll("\\", "/");
  if (name !== ".gitignore" && blockedNames.some((pattern) => pattern.test(name))) failures.push(`${name}: blocked filename`);
  if (!textExtensions.has(extname(path))) continue;
  const content = await readFile(path, "utf8");
  for (const rule of blockedContent) if (rule.pattern.test(content)) failures.push(`${name}: ${rule.name}`);
}

for (const required of ["README.md", "README.zh-CN.md", "demo/index.html", "demo/data.json", "docs/publication-boundary.md"]) {
  if (!files.some((path) => relative(root, path).replaceAll("\\", "/") === required)) failures.push(`${required}: required file missing`);
}

const demo = JSON.parse(await readFile(join(root, "demo", "data.json"), "utf8"));
if (demo.synthetic !== true) failures.push("demo/data.json: synthetic flag must be true");

if (failures.length) {
  console.error(`Public validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Public validation passed for ${files.length} files.`);
