# meetyou-ali-oss

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/meetyou-ali-oss.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/meetyou-ali-oss


## 模块载入
```
npm i meetyou-ali-oss -D
```

## 全局载入
```
npm i meetyou-ali-oss -g
```

## 配置文件
```
// https://github.com/ali-sdk/ali-oss
// config.json
{
  "accessKeyId": "",// 必填
  "accessKeySecret": "",// 必填
  "bucket": "", // 必填
  "region": "", // 选填
  "srcDir": "./public/assets", // 必填 要上传的文件所在路径
  "ignoreDir": true, // 是否忽略文件夹
  "ignoreSuffix": "html,css", // 忽略后缀逗号隔开，或者数组
  "prefix": "ad-activity.meiyou.com" // 必填 上传文件在云上的目录
}
```

## node

```
const aliOss = require('meetyou-ali-oss');

aliOss({
  "accessKeyId": "",// 必填
  "accessKeySecret": "",// 必填
  "bucket": "", // 必填
  "region": "", // 选填
  "srcDir": "/Users/youpinyao/meetyou/ad-activity/public/assets", // 必填 要上传的文件所在路径
  "prefix": "ad-activity.meiyou.com" // 必填 上传文件在云上的目录
}).then(() => {
  // 上传成功
});
```

## cli

```
meetyou-ali-oss ./config.json
```