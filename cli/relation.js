#!/usr/bin/env node

const args = require('../lib/parseArgs')(process);
const cli = require('../lib/cli');

args._.unshift('relation');

cli(args);
