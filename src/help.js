const chalk = require('chalk');

function help() {
  console.log(chalk.green(`
upload <configFilePath>   上传资源
upgrade                   升级
help                      提示
version                   版本

// https://github.com/ali-sdk/ali-oss
// config.json
{
  "accessKeyId": "",// 必填 当设置access后可不填
  "accessKeySecret": "",// 必填 当设置access后可不填
  "bucket": "", // 必填 当设置access后可不填
  "region": "", // 选填 当设置access后可不填
  "srcDir": "./public/assets", // 必填 要上传的文件所在路径
  "ignoreDir": true, // 是否忽略文件夹
  "ignoreSuffix": "html,css", // 忽略后缀逗号隔开，或者数组
  "prefix": "ad-activity.meiyou.com" // 必填 上传文件在云上的目录
}
`));
}

module.exports = help;
