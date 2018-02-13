#!/usr/bin/env node

const { execFile } = require('child_process');

console.log('Git post-merge hook - `yarn` with Node.js version', process.version);

execFile('yarn', (err, stdout, stderr) => {
    if(err) {
        throw err;
    }

    console.log(stdout);
});
