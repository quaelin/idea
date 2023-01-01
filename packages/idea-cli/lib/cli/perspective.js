import first from 'lodash/first.js';
import { isCID } from '../isCID.js';
import { isValuation } from '../isValuation.js';

// A "perspective expression" is either a CID or else a set of <cid>=<valuation> pairs
function extractPerspectives(args) {
  const pexes = [];
  let partialPex = null;

  function isCIDWithValuation(arg) {
    try {
      const [cid, valuation] = arg.split('=');
      return isCID(cid) && isValuation(Number(valuation));
    } catch (ex) {
      return false;
    }
  }

  function nextArgIsPartOfAPex() {
    if (!args._.length) return false;
    const nextArg = first(args._);
    if (isCID(nextArg)) return true;
    return isCIDWithValuation(nextArg);
  }

  function completePartialPex() {
    if (partialPex) {
      pexes.push(partialPex);
      partialPex = null;
    }
  }

  function consumeTheNextArg() {
    const nextArg = args._.shift();
    if (isCID(nextArg)) {
      completePartialPex();
      pexes.push(nextArg);
    } else {
      partialPex = partialPex || {};
      const [cid, valuation] = nextArg.split('=');
      partialPex[cid] = Number(valuation);
    }
  }

  while (nextArgIsPartOfAPex()) {
    consumeTheNextArg();
  }
  completePartialPex();

  return pexes;
}

function handleError(ex, usage) {
  console.error(`${ex}`);
  if (usage) {
    console.log('');
    console.log('Usage:');
    console.log(`  ${usage}`);
  }
}

const perspective_average_usage = 'perspective average <pex 1> <pex 2> [... <pex n>]';
async function perspective_average(idea, args) {
  const pexes = extractPerspectives(args);
  try {
    if (pexes.length < 2 || args._.length) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.average(...pexes));
  } catch (ex) {
    handleError(ex, perspective_average_usage);
  }
}

const perspective_get_usage = 'perspective get <pCid>';
async function perspective_get(idea, args) {
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
async function perspective_intersect(idea, args) {
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
async function perspective_keys(idea, args) {
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
async function perspective_merge(idea, args) {
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
async function perspective_neutralize(idea, args) {
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
async function perspective_polarize(idea, args) {
  const pexes = extractPerspectives(args);
  const factor = first(args._);
  try {
    if (pexes.length !== 1 || args._.length !== 1) {
      throw new TypeError('Incorrect number of arguments');
    }
    console.log(await idea.perspective.polarize(first(pexes), Number(factor)));
  } catch (ex) {
    handleError(ex, perspective_polarize_usage);
  }
}

const perspective_scope_usage = 'perspective scope <pex A> <pex B>';
async function perspective_scope(idea, args) {
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
async function perspective_skew(idea, args) {
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

export function perspectiveCli(idea, args) {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'average': return perspective_average(idea, args);
    case 'get': return perspective_get(idea, args);
    case 'intersect': return perspective_intersect(idea, args);
    case 'keys': return perspective_keys(idea, args);
    case 'merge': return perspective_merge(idea, args);
    case 'neutralize': return perspective_neutralize(idea, args);
    case 'polarize': return perspective_polarize(idea, args);
    case 'scope': return perspective_scope(idea, args);
    case 'skew': return perspective_skew(idea, args);
    default: return perspective_unknown(firstArg);
  }
}
