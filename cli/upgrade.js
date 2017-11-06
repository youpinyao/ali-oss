const execSeries = require('exec-series');
const chalk = require('chalk');
const cliSpinners = require('cli-spinners');
const ora = require('ora');

const version = require('./version');
const info = require('./info');
const currentVersion = version.version;

const loading = ora({
  spinner: cliSpinners.dost
});

function upgrade() {
  info().then(d => {
    const latestVersion = d['dist-tags'].latest;

    console.log(chalk.yellow(`当前版本 ${currentVersion}`));
    console.log(chalk.yellow(`最新版本 ${latestVersion}`));

    if (latestVersion !== currentVersion) {
      doUpdate();
    } else {
      console.log(chalk.red('无需更新'));
    }
  });
}

function doUpdate() {
  const cmd = 'npm install -g meetyou-ali-oss@latest';

  console.log();
  console.log(`run: ${chalk.green(cmd)}`);
  console.log();
  setTimeout(() => {
    loading.start(chalk.green('更新中'));
  });

  execSeries([cmd], (err, stdouts, stderrs) => {
    if (err) {
      throw err;
    }

    loading.stop();

    version();

    if (!stdouts[0] && !stderrs[0]) {
      console.log(chalk.red('无更新'));
    } else {
      console.log(chalk.green(stdouts[0])); // yields: ['foo\n', 'bar\n']
      console.log(chalk.green(stderrs[0])); // yields: ['', '']}
    };

  })
}


module.exports = upgrade;
