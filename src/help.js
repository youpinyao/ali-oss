const chalk = require('chalk');

function help() {
  console.log(chalk.green(`
// https://github.com/ali-sdk/ali-oss
// config.json
{
  "accessKeyId": "",// 必填 当设置access后可不填
  "accessKeySecret": "",// 必填 当设置access后可不填
  "bucket": "", // 必填 当设置access后可不填
  "region": "", // 选填 当设置access后可不填

  "srcDir": "./public/assets", // 必填 要上传的文件所在路径
  "ignoreDir": true, // 是否忽略文件夹
  "deduplication": false, // 云上已经有的文件不上传
  "ignoreSuffix": "html,css", // 忽略后缀逗号隔开，或者数组
  "prefix": "ad-activity.meiyou.com" // 必填 上传文件在云上的目录
}
`));
}

module.exports = help;
