var fs = require('fs');
var os = require('os');

var argv = require('yargs').argv;
require('dotenv').config();

const uuidv4 = require('uuid/v4');

/* Supports --env argument e.g.
 *
 * node scripts/env.js --env production
 *
 **/

try {
    const fileContents = fs.readFileSync('.env', 'utf-8');

    const lines = fileContents.split(/\r?\n/g);

    let hasAuthSecret = false;

    lines.map((line, idx) => {
        const [key, val] = line.split('=');

        if (key === 'NODE_ENV') {
            lines[idx] = `NODE_ENV=${argv.env || process.env.NODE_ENV}`;
        }

        if (key === 'AUTH_SECRET') {
            hasAuthSecret = true;
        }
    });

    if (!hasAuthSecret) {
        lines.push(`AUTH_SECRET=${uuidv4()}`);
    }

    const errHandler = (err) => {
        console.log('errHandler for writeStream', err);

        process.exit(1);
    };

    const writeFile$ = fs.createWriteStream('.env').on('error', errHandler);

    lines.forEach((line) => {
        if (line !== '') {
            writeFile$.write(`${line}${os.EOL}`)
        }
    });
} catch (e) {
    const data = [
        'NODE_ENV=development',
        `AUTH_SECRET=${uuidv4()}`
    ];

    fs.writeFileSync('.env', data.join(os.EOL));
}
