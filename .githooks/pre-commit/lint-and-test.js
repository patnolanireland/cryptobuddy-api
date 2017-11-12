#!/usr/bin/env node

const { execFile } = require('child_process');

console.log('Git pre-commit hook lint-and-test with Node.js version', process.version);

execFile('npm', ['run', 'git-pre-commit'], (err, stdout, stderr) => {
    if(err) {
        throw err;
    }

    console.log(stdout);
});
