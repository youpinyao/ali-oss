const fs = require('fs');
const path = require('path');

function eachFiles(src) {
  const list = [];

  _eachFiles(src);

  function _eachFiles(src) {
    const files = fs.readdirSync(src);

    files.forEach(filename => {
      const fstats = fs.statSync(path.join(src, filename));

      if (fstats.isFile()) {
        if (filename.startsWith('.')) {
          return;
        }
        list.push(path.join(src, filename));
      } else {
        _eachFiles(path.join(src, filename));
      }
    });
  }

  return list;
}

module.exports = eachFiles;
