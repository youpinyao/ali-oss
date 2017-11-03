const oss = require('ali-oss');
const co = require('co');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const files = require('./files');

module.exports = function (config) {
  convertPath(config);

  const store = oss(Object.assign({

  }, config));

  return checkBucket().then(() => {
    return eachFiles();
  }).then(files => {
    return doUpload(files);
  });

  // 检测bucket 是否存在
  function checkBucket() {
    return new Promise(function (resolve, reject) {
      co(function* () {
        return yield store.listBuckets({
          "max-keys": 2,
          prefix: config.bucket,
        });
      }).then(data => {
        if (!data.buckets) {
          console.log(chalk.red('bucket 不存在'));
          reject();
          return;
        }
        if (data.buckets.length > 1) {
          console.log(chalk.red('bucket 不唯一'));
          reject();
          return;
        }
        resolve();
      });
    });
  }

  function eachFiles() {
    return new Promise(function (resolve, reject) {
      if (!config.srcDir) {
        console.log(chalk.red('srcDir 不存在'));
        reject();
      }
      if (!config.srcDir) {
        console.log(chalk.red('prefix 不存在'));
        reject();
      }

      resolve(files(config.srcDir, {
        ignoreDir: config.ignoreDir,
        ignoreSuffix: config.ignoreSuffix,
      }));
    });
  }

  function doUpload(files) {
    const len = files.length;
    let count = 0;

    return new Promise(function (resolve, reject) {
      if (len === 0) {
        resolve();
        return;
      }

      files.forEach(file => {
        co(function* () {
          return yield store.put(path.join(config.prefix, file.split(config.srcDir)[1]), fs.createReadStream(file));
        }).then(data => {
          console.log(chalk.green(file));
          console.log(chalk.green(data.url));
          console.log(chalk.yellow('------------------------'));
          count++;

          if (count >= len) {
            resolve();
          }
        }, data => {
          reject(data);
        });
      });
    });
  }

  function convertPath(config) {
    if (config.srcDir && path.resolve(config.srcDir) !== config.srcDir) {
      config.srcDir = path.join(process.cwd(), config.srcDir);
    }
  }
}
