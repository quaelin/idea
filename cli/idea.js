#!/usr/bin/env node

const { first, includes } = require('lodash');

const args = require('../lib/parseArgs')(process);
const cli = require('../lib/cli');

const firstArg = first(args._);
if (!includes(['perspective', 'relation'], firstArg)) {
  args._.unshift('idea');
}

cli(args);
