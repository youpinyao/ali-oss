#!/usr/bin/env node

const args = process.argv.slice(2);
const type = args[0];

const upload = require('./cli/upload');
const version = require('./cli/version');
const help = require('./cli/help');
const upgrade = require('./cli/upgrade');
const access = require('./cli/access');

switch (type) {
  case 'upload':
    upload(args[1]);
    break;
  case 'access':
    access();
    break;
  case 'upgrade':
    upgrade();
    break;
  case 'version':
    version.print();
    break;
  case 'help':
    help();
    break;
  default:
    help();
    break;
}
