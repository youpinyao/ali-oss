const execSeries = require('exec-series');

function info() {
  return new Promise((resolve, reject) => {
    execSeries(['npm info meetyou-ali-oss'], (err, stdouts, stderrs) => {
      if (err) {
        reject(err);
        return;
      }
      const json = eval(`const json = ${stdouts[0]}; json;`)
      resolve(json);
    });
  })
}

module.exports = info;
