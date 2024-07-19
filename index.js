const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { exec: execCallback } = require('child_process');
const util = require('util');
const exec = util.promisify(execCallback); // 将exec转换为Promise形式

async function init() {
  try {
    const answers = await inquirer.prompt([
      { name: 'name', message: '脚本名称 / Script Name:', default: 'My Script' },
      { name: 'version', message: '版本 / Version: ', default: '1.0.0' },
      { name: 'description', message: '脚本描述 / Description:', default: "Optimize the user experience!" },
      { name: 'author', message: '作者 / Author:', default: "FurryDoge" },
      { name: 'match', message: '作用域URL（xxx.xxx 无需https或http） / Match URL (xxx.com not https or http):', default: "www.ccw.site/*" }
    ]);

    const srcDir = path.join(process.cwd(), 'src');
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    const metadataPath = path.join(srcDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(answers, null, 2));
    console.log('元数据已填写至src/metadata.json / Metadata saved to src/metadata.json.');

    const indexJsPath = path.join(srcDir, 'index.js');
    const templateContent = `
(function() {
    'use strict';

    // Your code here...
})();`;
    fs.writeFileSync(indexJsPath, templateContent);
    console.log('模版已写入src/index.js / Template saved to src/index.js.');

    // 确保package.json存在
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      await exec('npm init -y');
    }

    // 安装依赖
    await exec('npm install tsup');
    console.log('tsup 安装完成 / tsup has been installed.');

    const tsupConfigContent = `
import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

function generateMetadataBanner() {
  const metadataPath = path.resolve('src/metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  let banner = '// ==UserScript==\\n';
  Object.keys(metadata).forEach(key => {
    banner += \`// @\${key}         \${metadata[key]}\\n\`;
  });
  banner += '// ==/UserScript==\\n';
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
});`;
    const configPath = path.resolve(process.cwd(), 'tsup.config.js');
    fs.writeFileSync(configPath, tsupConfigContent);
    console.log('tsup.config.js 文件已创建 / tsup.config.js file has been created.');

    // 更新package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    packageJson.scripts.build = 'tsup';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('已将build命令加入package.json / Build command has been added to package.json.');

    // 安装typescript
    await exec('npm install typescript');
    console.log("已安装typescript / Typescript has been installed");
  } catch (error) {
    console.error(`初始化过程中出现错误: ${error}`);
  }
}

// 新增build函数
async function build() {
  try {
    console.log('开始打包脚本... / Starting to package the script...');
    const { stdout, stderr } = await exec('npm run build');
    if (stderr) {
      console.error(`打包错误 / Build Error: ${stderr}`);
    }
    console.log('打包完成 / Build completed.');
  } catch (error) {
    console.error(`打包错误 / Build Error: ${error}`);
  }
}

// 导出init和build函数
module.exports = { init, build };