#!/usr/bin/env node

const commander = require('commander');
const args = process.argv.slice(2);
const type = args[0];

const upload = require('./cli/upload');
const help = require('./cli/help');
const upgrade = require('./cli/upgrade');
const access = require('./cli/access');

commander
  .version(require('./package.json').version)
  .option('--upload,upload <path>', 'upload to aliyun oss', function (path) {
    upload(path);
  })
  .option('--access,access', 'init access file', function (path) {
    access();
  })
  .option('--upgrade,upgrade', 'upgrade', function (path) {
    upgrade();
  })

commander.on('--help', function () {
  help();
});

commander.parse(process.argv);
