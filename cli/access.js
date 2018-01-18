const chalk = require('chalk');
const input = require('input');
const path = require('path');
const fs = require('fs');
const aliossaccess = require('../src/aliossaccess');

const inputOption = {
  validate: function (answer) {
    if (!answer) {
      return '必填';
    }
    return true;
  }
}

module.exports = function () {
  const json = {
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
  }

  getText('accessKeyId').then(d => {
    json.accessKeyId = d.trim();
    return getText('accessKeySecret');
  }).then(d => {
    json.accessKeySecret = d.trim();
    return getText('bucket');
  }).then(d => {
    json.bucket = d.trim();
    return getText('region');
  }).then(d => {
    json.region = d.trim();
    fs.writeFileSync(aliossaccess, JSON.stringify(json), {
      encoding: 'utf-8'
    });
  });
}

function getText(type) {
  return new Promise((resolve, reject) => {
    input.text(`${type}：`, inputOption).then(d => {
      resolve(d);
    });
  });
}
