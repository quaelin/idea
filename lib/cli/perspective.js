const { first } = require('lodash');
const idea = require('../..');

function extractPerspectiveExpressions(args) {
  while (true) {

  }
}

function handleError(ex, usage) {
  console.error(`${ex}`);
  if (usage) {
    console.log('');
    console.log('Usage:');
    console.log(`  ${usage}`);
  }
}

const perspective_get_usage = 'perspective get <pCid>';
async function perspective_get(args) {
  const pCid = first(args._);
  try {
    if (args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.get(pCid));
  } catch (ex) {
    handleError(ex, perspective_get_usage);
  }
}

async function perspective_intersect(args) {
  const pexes = extractPerspectiveExpressions(args);
  try {
    console.log(await idea.perspective.intersect(...pexes));
  } catch (ex) {
    handleError(ex);
  }
}

async function perspective_keys(args) {

}

async function perspective_merge(args) {

}

async function perspective_neutralize(args) {

}

async function perspective_polarize(args) {

}

async function perspective_scope(args) {

}

async function perspective_skew(args) {

}

function perspective_unknown(firstArg) {
  console.error(`Unknown perspective subcommand: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'get': return perspective_get(args);
    case 'intersect': return perspective_intersect(args);
    case 'keys': return perspective_keys(args);
    case 'merge': return perspective_merge(args);
    case 'neutralize': return perspective_neutralize(args);
    case 'polarize': return perspective_polarize(args);
    case 'scope': return perspective_scope(args);
    case 'skew': return perspective_skew(args);
    default: return perspective_unknown(firstArg);
  }
};
