#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const upload = require('./src/upload');
const tip = require('./src/tip');

const args = process.argv.slice(2);

if (!args.length) {
  console.log(chalk.red('请传入配置文件路径'));
  tip();
  return;
}

const filePath = path.resolve(__dirname, args[0]);
const isExist = fs.existsSync(filePath);
let config = null;

if (!isExist) {
  console.log(chalk.red('文件不存在'));
  tip();
  return;
}

try {
  config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  upload(config).then(data => {
    console.log(chalk.green('上传完成'));
  });
} catch (e) {
  console.log(chalk.red('文件格式错误'));
  tip();
}
