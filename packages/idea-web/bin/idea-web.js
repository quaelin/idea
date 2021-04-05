#!/usr/bin/env node

const args = require('../src/parseArgs')(process);
const server = require('../src/main')(args);

server.run();
