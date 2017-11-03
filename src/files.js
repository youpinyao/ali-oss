const fs = require('fs');
const path = require('path');

function eachFiles(src, config) {
  const list = [];
  let ignoreSuffix = config.ignoreSuffix || [];

  if (typeof ignoreSuffix === 'string') {
    ignoreSuffix = ignoreSuffix.split(',');
  }

  _eachFiles(src);

  function _eachFiles(src) {
    const files = fs.readdirSync(src);

    files.forEach(filename => {
      const fstats = fs.statSync(path.join(src, filename));

      if (fstats.isFile()) {
        let skip = false;
        ignoreSuffix.forEach(suffix => {
          if (filename.endsWith(`.${suffix}`)) {
            skip = true;
          }
        });
        if (filename.startsWith('.') || skip) {
          return;
        }
        list.push(path.join(src, filename));
      } else if (config.ignoreDir !== true) {
        _eachFiles(path.join(src, filename));
      }
    });
  }

  return list;
}

module.exports = eachFiles;
