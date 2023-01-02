#!/usr/bin/env node --experimental-vm-modules

import { cli } from '../lib/cli/index.js';
import { parseArgs } from '../lib/parseArgs.js';

const args = parseArgs(process);

args._.unshift('relation');

cli(args);
