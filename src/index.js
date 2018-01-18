const oss = require('ali-oss');
const co = require('co');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const files = require('./files');
const aliossaccess = require('./aliossaccess');

module.exports = function (config) {
  // 路径转换
  convertPath(config);

  let defaultConfig = {
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
  };

  if (fs.existsSync(aliossaccess)) {
    const access = JSON.parse(fs.readFileSync(aliossaccess, 'utf-8'));

    defaultConfig = Object.assign(defaultConfig, access);
  }

  const store = oss(Object.assign(defaultConfig, config));

  return eachFiles().then(files => {
    return doUpload(files);
  });

  function eachFiles() {
    return new Promise(function (resolve, reject) {
      if (!config.srcDir) {
        console.log(chalk.red('srcDir 不存在'));
        reject();
      }
      if (!config.prefix) {
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

    console.log(chalk.green(`目录：${config.srcDir}`));
    console.log(chalk.green(`文件数：${len}`));
    console.log(chalk.yellow('------------------------'));

    return new Promise(function (resolve, reject) {
      if (len === 0) {
        resolve({
          len,
          config,
        });
        return;
      }

      next();

      function next() {
        const file = files[count];
        let filename = file.split(config.srcDir)[1];
        filename = filename.replace(/\\/g, '/');
        const ossPath = `${config.prefix}${filename}`;

        console.log(chalk.green(file));

        co(function* () {
          return yield store.list({
            prefix: ossPath,
          });
        }).then(data => {
          if (config.deduplication !== true || (config.deduplication === true && data.objects === undefined)) {
            co(function* () {
              return yield store.put(ossPath, fs.createReadStream(file));
            }).then(data => {
              nextCallback(data);
            }, data => {
              reject(data);
            });
          } else {
            console.log(chalk.yellow('文件重复不上传'));
            nextCallback();
          }
        });
      }

      function nextCallback(data) {
        data && data.url && console.log(chalk.green(data.url));
        console.log(chalk.yellow('------------------------'));
        count++;

        if (count >= len) {
          resolve({
            len,
            config,
          });
          return;
        }
        next();
      }
    });
  }

  function convertPath(config) {
    if (config.srcDir && path.resolve(config.srcDir) !== config.srcDir && path.resolve(config.srcDir).replace(/\\/g, '/') !== config.srcDir) {
      config.srcDir = path.join(process.cwd(), config.srcDir);
    }
  }
}
