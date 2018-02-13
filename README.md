# TypeScript Restify API Server

## Prerequisites

1. [NodeJS >= 8.0.0](https://nodejs.org/)
2. [Yarn](https://yarnpkg.com/)

## Quickstart

```

npm install -g typescript bunyan

yarn

yarn watch

```

## Overview

This is a base scaffolding for a Restify API Server using TypeScript. `npm scripts` to manage the development workflow.

## Project Scaffolding

As TypeScript is being transpiled the `src` directory contains the TypeScript which is transpiled to the `lib`
directory which is gitignored.  Essentially the TypeScript source is contained in the src directory and transpiled to lib.

## Git Hooks

Git Hooks are employed to enforce code quality and aid development and are managed by the npm package `git-hooks-plus`,
a cross platform library which will manage the scripts in the `.git/hooks` directory.

1. A pre-commit hook that performs a lint and test before allowing a `git commit` to succeed.
2. A post-merge hook that performs an `npm install` after doing a `git pull` to save manual running of such.

## Debugging

Debugging can be performed by [Chrome Dev Tools](https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4).
Source maps are also supported so you can debug TypeScript. Debugging capabilities verified on Node.js version 8.6.0.

```
    chrome://inspect/#devices
```

and then click the link "Open dedicated DevTools for Node"


## Testing

Mocha, Chai and Supertest are currently used for testing.  Each api route should be tested mocking out databases and
functionality as required.  A test configuration can be observed in `config/test.json` which disables logging for all
but errors

```
yarn test
```

### Debugging Tests

Sometimes it is desirable to be able to put a debugger on your tests.  This can be achieved by writing the `debugger`
statement in your code and then running

```
npm run watch:test:debug
```

This will halt/break the code immediately so you'll have to hit the play button to get to your first breakpoint which
may be line number in the file you placed your `debugger` statement on.
