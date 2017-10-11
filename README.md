# TypeScript Restify API Server

### Prerequisites

1. [NodeJS >= 7.10.1](https://nodejs.org/)

## Quickstart

```

npm install -g typescript bunyan

npm install

npm run watch

```

## Overview

This is a base scaffolding for a Restify API Server using TypeScript. `npm scripts` to manage the development workflow.

## Project Scaffolding

As TypeScript is being transpiled the `src` directory contains the TypeScript which is transpiled to the `lib`
directory which is gitignored.  Essentially the TypeScript source is contained in the src directory and transpiled to lib.

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
npm run test
```
