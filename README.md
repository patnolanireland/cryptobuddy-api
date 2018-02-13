# Crypto Buddy API Server

## Prerequisites

1. [NodeJS >= 8.0.0](https://nodejs.org/)
2. [Yarn](https://yarnpkg.com/)

## Quickstart

Development can be performed locally as follows:

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
yarn watch:test:debug
```

This will halt/break the code immediately so you'll have to hit the play button to get to your first breakpoint which
may be line number in the file you placed your `debugger` statement on.

## Docker

The project has two Dockerfiles, the primary is based off the Node image and the slimmer `Dockerfile.alpine` uses the
node alpine variant.

### Docker Compose

Docker compose can be used for development as follows:

```
docker-compose -f docker-compose.debug.yml up --build
```

Please ensure that `yarn` is run first to ensure that the local `node_modules` directory is present as they are mapped
for development purposes.  The debug version of compose uses the `watch` command from npm scripts and the sourcemaps
have been tweaked to allow Chrome Dev Tools to work in a containerized environment by virtue of inlineSourceMap.

Additionally Docker Compose can be used for testing which is useful in a CI/CD environment.  Use the
`docker-compose.test.yml` in the usual manner.
