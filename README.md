#meetyou-ali-oss

## 配置文件
```
// https://github.com/ali-sdk/ali-oss
// config.json
{
  "accessKeyId": "",// 必填
  "accessKeySecret": "",// 必填
  "bucket": "", // 必填
  "region": "", // 选填
  "srcDir": "/Users/youpinyao/meetyou/ad-activity/public/assets", // 必填 要上传的文件所在路径
  "prefix": "ad-activity.meiyou.com" // 上传文件在云上的目录
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
  "prefix": "ad-activity.meiyou.com" // 上传文件在云上的目录
}).then(() => {
  // 上传成功
});
```

## cli

```
meetyou-ali-oss ./config.json
```