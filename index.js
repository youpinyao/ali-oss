#!/usr/bin/env node

const commander = require('commander');

const upload = require('./cli/upload');
const help = require('./cli/help');
const upgrade = require('./cli/upgrade');
const init = require('./cli/init');

commander
  .version(require('./package.json').version)
  .option('--upload, upload <path>', 'upload to aliyun oss', function (path) {
    upload(path);
  })
  .option('--init, init', 'init access file', function (path) {
    init();
  })
  .option('--upgrade, upgrade', 'upgrade', function (path) {
    upgrade();
  })

commander.on('--help', function () {
  help();
});

commander.parse(process.argv);
