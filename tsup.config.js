import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

// 读取并转换元数据
function generateMetadataBanner() {
  const metadataPath = path.resolve('src/metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  let banner = '// ==UserScript==\n';
  Object.keys(metadata).forEach(key => {
    banner += `// @${key}         ${metadata[key]}\n`;
  });
  banner += '// ==/UserScript==\n';
  return banner;
}

export default defineConfig({
  entry: ['src/index.js'],
  format: ['iife'],
  outDir: 'dist',
  minify: true,
  bundle: true,
  sourcemap: false,
  banner: {
    js: generateMetadataBanner() // 将生成的元数据注释作为js属性的值
  }
});