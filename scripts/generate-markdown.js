import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Paths
const distDir = path.resolve(__dirname, '../dist');

// Recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Generate Markdown
console.log('Generating Agent Markdown files...');
const htmlFiles = findHtmlFiles(distDir);

let count = 0;
for (const file of htmlFiles) {
  const htmlContent = fs.readFileSync(file, 'utf-8');
  
  // Basic pre-processing to remove scripts and styles for cleaner markdown
  const cleanHtml = htmlContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ''); // Optional: remove nav to focus on core content
    
  const markdownContent = turndownService.turndown(cleanHtml);
  
  // Save as .md
  const mdFilePath = file.replace(/\.html$/, '.md');
  fs.writeFileSync(mdFilePath, markdownContent, 'utf-8');
  count++;
}

console.log(`Successfully generated ${count} Markdown files for AI Agents.`);
