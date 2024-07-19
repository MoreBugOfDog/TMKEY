#!/usr/bin/env node

const { program } = require('commander');
const packageJson = require('./package.json');
// 导入index.js中的init函数
const { init,build } = require('./index.js'); // 确保路径正确


program
  .version(packageJson.version, '-v, --version', '输出当前版本号 / Output the current version')
  .description('Tampermonkey 脚本开发工具 / Tampermonkey script development tool');

program
  .command('init')
  .description('初始化脚本项目 / Initialize the script project')
  .action(() => {
    
    // 直接调用init函数而不是通过exec执行
    init();

  });
  program
  .command('build')
  .description('打包脚本 / Build the script')
  .action(() => {
    build()

  });
program.parse(process.argv);