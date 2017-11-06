const chalk = require('chalk');
const input = require('input');
const path = require('path');
const fs = require('fs');

module.exports = function () {
  let accessKeyId = '';
  let accessKeySecret = '';
  let bucket = '';
  let region = '';

  getAccessKeyId().then(d => {
    accessKeyId = d.trim();
    return getAccessKeySecret();
  }).then(d => {
    accessKeySecret = d.trim();
    return getBucket();
  }).then(d => {
    bucket = d.trim();
    return getRegion();
  }).then(d => {
    region = d.trim();
    fs.writeFileSync('.access', `{
      "accessKeyId": "${accessKeyId}",
      "accessKeySecret": "${accessKeySecret}",
      "bucket": "${bucket}",
      "region": "${region}"
    }`, {
      encoding: 'utf-8'
    });
  });
}

function getAccessKeyId() {
  return new Promise((resolve, reject) => {
    input.text('请输入 accessKeyId：').then(d => {
      if (!d) {
        getAccessKeyId().then(dd => {
          resolve(dd);
        });
        return;
      }
      resolve(d);
    });
  });
}

function getAccessKeySecret() {
  return new Promise((resolve, reject) => {
    input.text('请输入 accessKeySecret').then(d => {
      if (!d) {
        getAccessKeySecret().then(dd => {
          resolve(dd);
        });
        return;
      }
      resolve(d);
    });
  });
}

function getBucket() {
  return new Promise((resolve, reject) => {
    input.text('请输入 bucket').then(d => {
      if (!d) {
        getBucket().then(dd => {
          resolve(dd);
        });
        return;
      }
      resolve(d);
    });
  });
}

function getRegion() {
  return new Promise((resolve, reject) => {
    input.text('请输入 region').then(d => {
      if (!d) {
        getRegion().then(dd => {
          resolve(dd);
        });
        return;
      }
      resolve(d);
    });
  });
}
