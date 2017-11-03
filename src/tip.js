const chalk = require('chalk');

function tip() {
  console.log(chalk.green(`
// https://github.com/ali-sdk/ali-oss
// config.json
{
  "accessKeyId": "",// 必填
  "accessKeySecret": "",// 必填
  "bucket": "", // 必填
  "region": "", // 选填
  "srcDir": "./public/assets", // 必填 要上传的文件所在路径
  "prefix": "ad-activity.meiyou.com" // 必填 上传文件在云上的目录
}
`));
}

module.exports = tip;
