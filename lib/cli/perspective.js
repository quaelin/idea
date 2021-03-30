const { first } = require('lodash');
const idea = require('../..');

function extractPerspectives(args) {
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

const perspective_intersect_usage = 'perspective intersect <pex 1> <pex 2> [...<pex n>]';
async function perspective_intersect(args) {
  const pexes = extractPerspectives(args);
  try {
    if (pexes.length < 2 || args._.length) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.intersect(...pexes));
  } catch (ex) {
    handleError(ex, perspective_intersect_usage);
  }
}

const perspective_keys_usage = 'perspective keys <pCid>';
async function perspective_keys(args) {
  const pCid = first(args._);
  try {
    if (args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.keys(pCid));
  } catch (ex) {
    handleError(ex, perspective_keys_usage);
  }
}

const perspective_merge_usage = 'perspective merge <pex 1> [... <pex n>]';
async function perspective_merge(args) {
  const pexes = extractPerspectives(args);
  try {
    if (pexes.length < 1 || args._.length) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.merge(...pexes));
  } catch (ex) {
    handleError(ex, perspective_merge_usage);
  }
}

const perspective_neutralize_usage = 'perspective neutralize <pex>';
async function perspective_neutralize(args) {
  const pexes = extractPerspectives(args);
  try {
    if (pexes.length !== 1 || args._.length) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.neutralize(first(pexes)));
  } catch (ex) {
    handleError(ex, perspective_neutralize_usage);
  }
}

const perspective_polarize_usage = 'perspective polarize <pex> <factor>';
async function perspective_polarize(args) {
  const pexes = extractPerspectives(args);
  const factor = first(args._);
  try {
    if (pexes.length !== 1 || args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.polarize(first(pexes)), factor);
  } catch (ex) {
    handleError(ex, perspective_polarize_usage);
  }
}

const perspective_scope_usage = 'perspective scope <pex A> <pex B>';
async function perspective_scope(args) {
  const [pexA, pexB] = extractPerspectives(args);
  try {
    if (!pexA || !pexB || args._.length) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.scope(pexA, pexB));
  } catch (ex) {
    handleError(ex, perspective_scope_usage);
  }
}

const perspective_skew_usage = 'perspective skew <pex A> <pex B> <factor>';
async function perspective_skew(args) {
  const [pexA, pexB] = extractPerspectives(args);
  const factor = first(args._);
  try {
    if (!pexA || !pexB || args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.skew(pexA, pexB, factor));
  } catch (ex) {
    handleError(ex, perspective_skew_usage);
  }
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
