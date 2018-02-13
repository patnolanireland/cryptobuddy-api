#!/usr/bin/env node

const { execFile } = require('child_process');

console.log('Git post-merge hook - `npm-install` with Node.js version', process.version);

execFile('npm', ['install'], (err, stdout, stderr) => {
    if(err) {
        throw err;
    }

    console.log(stdout);
});
