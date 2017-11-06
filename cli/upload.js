const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const upload = require('../src/index');
const help = require('../src/help');

function uploadCli(configPath) {
  if (!configPath) {
    console.log(chalk.red('请传入配置文件路径'));
    help();
    return;
  }

  const filePath = path.resolve(process.cwd(), configPath);
  const isExist = fs.existsSync(filePath);
  let config = null;

  if (!isExist) {
    console.log(chalk.red(filePath));
    console.log(chalk.red('文件不存在'));
    help();
    return;
  }

  try {
    config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    upload(config).then(data => {
      console.log(chalk.green('上传完成'));
    });
  } catch (e) {
    console.log(chalk.red('失败'));
    console.log(e);
    help();
  }

}

module.exports = uploadCli;
