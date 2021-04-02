const { each, includes } = require('lodash');
const { RELATION_TYPES } = require('../relationTypes');

function usage() {
  console.log('Usage:');
  console.log('  relation R:<type> A=<cid> [B=<cid> [C=<cid> [D=<cid>]]]');
  console.log('');
  console.log(`  Available types: ${RELATION_TYPES}`);
}

function getOperands(args) {
  const allowed = ['A', 'B', 'C', 'D'];
  const operands = {};
  each(args._, (pair) => {
    const [letter, iCid] = pair.split('=', 2);
    if (includes(allowed, letter)) {
      operands[letter] = iCid;
    }
  });
  return operands;
}

function handleError(ex) {
  console.error(`${ex}`);
  console.log('');
  usage();
}

async function relation_analogy(idea, args) {
  const { A, B, C, D } = getOperands(args);
  try {
    console.log(await idea.relation.analogy(A, B, C, D));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_and(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.and(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_identity(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.identity(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_implies(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.implies(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_improves(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.improves(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_isa(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.isa(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_negation(idea, args) {
  const { A } = getOperands(args);
  try {
    console.log(await idea.relation.negation(A));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_or(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.or(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

async function relation_xor(idea, args) {
  const { A, B } = getOperands(args);
  try {
    console.log(await idea.relation.xor(A, B));
  } catch (ex) {
    handleError(ex);
  }
}

function relation_unknown(relationType) {
  console.error(`Unknown relation type: ${relationType}`);
  console.log('');
  usage();
}

module.exports = (idea, args) => {
  const relationType = args._.shift();

  switch (relationType) {
    case 'R:Analogy': return relation_analogy(idea, args);
    case 'R:And': return relation_and(idea, args);
    case 'R:Identity': return relation_identity(idea, args);
    case 'R:Implies': return relation_implies(idea, args);
    case 'R:Improves': return relation_improves(idea, args);
    case 'R:IsA': return relation_isa(idea, args);
    case 'R:Negation': return relation_negation(idea, args);
    case 'R:Or': return relation_or(idea, args);
    case 'R:XOr': return relation_xor(idea, args);
    default: return relation_unknown(relationType);
  }
};
