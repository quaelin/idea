#!/usr/bin/env node

import { cli } from '../lib/cli/index.js';
import { parseArgs } from '../lib/parseArgs.js';

const args = parseArgs(process);

args._.unshift('perspective');

cli(args);
