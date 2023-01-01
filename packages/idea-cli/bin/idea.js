#!/usr/bin/env node

import first from 'lodash/first.js';
import includes from 'lodash/includes.js';

import { cli } from '../lib/cli/index.js';
import { parseArgs } from '../lib/parseArgs.js';

const args = parseArgs(process);

const firstArg = first(args._);
if (!includes(['perspective', 'relation'], firstArg)) {
  args._.unshift('idea');
}

cli(args);
