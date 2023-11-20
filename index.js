const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function killPortUnix(port) {
  const {stdout} = await exec('lsof -i -P -n');
  const regexp = new RegExp(`:${port} `);
  const lines = stdout.split('\n').filter(el => el.match(regexp));
  if (lines.length) {
    lines.forEach(async line => {
      const procNum = line.split(/\s+/)[1]; // [node, 32016, allenkim, ...]
      await exec(`kill -9 ${procNum}`);
      return true;
    })
  } else {
    return `No process running on port ${port}`;
  }
}

async function killPortWin(port) {
  const {stdout} = await exec('netstat -nao');
  const regexp = new RegExp(`^ *TCP *[^ ]*:${port}`, 'gm');
  const lines = stdout.split('\n').filter(el => el.match(regexp));
  if (lines.length) {
    lines.forEach(async line => {
      const match = line.match(/(\d*)\w*(\n|$)/gm);
      await exec(`TaskKill /F /PID ${match[0]}`);
      return true;
    })
  } else {
    return `No process running on port ${port}`;
  }
}

function killport(port) {
  return new Promise(async (resolve, reject) => {
    const func = process.platform === 'win32' ? killPortWin : killPortUnix;
    try {
      const resp = await func(port)
      resolve(resp);
    } catch(e) {
      reject(e);
    }
  });
}


module.exports = killport;