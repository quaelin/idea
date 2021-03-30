const { first } = require('lodash');
const idea = require('../..');

function handleError(ex, usage) {
  console.error(`${ex}`);
  if (usage) {
    console.log('');
    console.log('Usage:');
    console.log(`  ${usage}`);
  }
}

async function idea_add(args) {
  const str = first(args._);
  try {
    if (args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.add(str));
  } catch (ex) {
    handleError(ex);
  }
}

async function idea_get(args) {
  const iCid = first(args._);
  try {
    if (args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.get(iCid));
  } catch (ex) {
    handleError(ex);
  }
}

function idea_unknown(firstArg) {
  console.error(`Unknown idea subcommand: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'add': return idea_add(args);
    case 'get': return idea_get(args);
    default: return idea_unknown(firstArg);
  }
};
