#!/usr/bin/env node
const killPort = require('./index');
(async function(port) {
  if (/^\d+$/.test(port)) {
    const resp = await killPort(port);
    resp && console.log(resp);
  } else {
    throw new Error('port must be a number.');
  }
})(process.argv[2]);