const { each, includes } = require('lodash');

const idea = require('../..');

function usage() {
  console.log('Usage:');
  console.log('  relation R:<type> A=<cid> [B=<cid> [C=<cid> [D=<cid>]]]');
  console.log('');
  console.log(`  Available types: ${idea.relation.TYPES}`);
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

async function relation_analogy(args) {
  const { A, B, C, D } = getOperands(args);
  console.log(await idea.relation.analogy(A, B, C, D));
}

async function relation_and(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.and(A, B));
}

async function relation_identity(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.identity(A, B));
}

async function relation_implies(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.implies(A, B));
}

async function relation_improves(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.improves(A, B));
}

async function relation_isa(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.isa(A, B));
}

async function relation_negation(args) {
  const { A } = getOperands(args);
  console.log(await idea.relation.negation(A));
}

async function relation_or(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.or(A, B));
}

async function relation_xor(args) {
  const { A, B } = getOperands(args);
  console.log(await idea.relation.xor(A, B));
}

function relation_unknown(relationType) {
  console.error(`Unknown relation type: ${relationType}`);
  console.log('');
  usage();
}

module.exports = (args) => {
  const relationType = args._.shift();

  try {
    switch (relationType) {
      case 'R:Analogy': return relation_analogy(args);
      case 'R:And': return relation_and(args);
      case 'R:Identity': return relation_identity(args);
      case 'R:Implies': return relation_implies(args);
      case 'R:Improves': return relation_improves(args);
      case 'R:IsA': return relation_isa(args);
      case 'R:Negation': return relation_negation(args);
      case 'R:Or': return relation_or(args);
      case 'R:XOr': return relation_xor(args);
      default: return relation_unknown(relationType);
    }
  } catch (ex) {
    handleError(ex);
  }
};
