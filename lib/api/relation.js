const { each, has } = require('lodash');
const assertCid = require('../assertCid');
const ipfsClient = require('../ipfsClient');

const TYPES = ['Analogy', 'And', 'Identity', 'Implies', 'Improves', 'IsA', 'Negation', 'Or', 'XOr'];

function assertOperands(operands) {
  each(['A', 'B', 'C', 'D'], (letter) => {
    if (has(operands, letter)) {
      try {
        assertCid(operands[letter]);
      } catch (ex) {
        throw new TypeError(`Expected operand ${letter} to be a valid cid, but got: ${ex}`);
      }
    }
  });
}

// For commutative operations, the "canonical order" is enforced where operands
// must be provided in alphanumeric order.
function canonicalOrderForCommutativeOperands({ A, B }) {
  if (A <= B) return { canonicalA: A, canonicalB: B };
  return { canonicalA: B, canonicalB: A };
}

async function ipfsAdd(content) {
  const ipfs = await ipfsClient();
  const { cid } = await ipfs.add(content);
  return cid;
}

async function analogy(A, B, C, D) {
  assertOperands({ A, B, C, D });
  const content = `{"Relation":"Analogy","A":"${A}","B":"${B}","C":"${C}","D":"${D}"}`;
  return ipfsAdd(content);
}

async function and(A, B) {
  assertOperands({ A, B });
  const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
  const content = `{"Relation":"And","A":"${canonicalA}","B":"${canonicalB}"}`;
  return ipfsAdd(content);
}

async function identity(A, B) {
  assertOperands({ A, B });
  const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
  const content = `{"Relation":"Identity","A":"${canonicalA}","B":"${canonicalB}"}`;
  return ipfsAdd(content);
}

async function implies(A, B) {
  assertOperands({ A, B });
  const content = `{"Relation":"Implies","A":"${A}","B":"${B}"}`;
  return ipfsAdd(content);
}

async function improves(A, B) {
  assertOperands({ A, B });
  const content = `{"Relation":"Improves","A":"${A}","B":"${B}"}`;
  return ipfsAdd(content);
}

async function isa(A, B) {
  assertOperands({ A, B });
  const content = `{"Relation":"IsA","A":"${A}","B":"${B}"}`;
  return ipfsAdd(content);
}

async function negation(A) {
  assertOperands({ A });
  const content = `{"Relation":"Negation","A":"${A}"}`;
  return ipfsAdd(content);
}

async function or(A, B) {
  assertOperands({ A, B });
  const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
  const content = `{"Relation":"Or","A":"${canonicalA}","B":"${canonicalB}"}`;
  return ipfsAdd(content);
}

async function xor(A, B) {
  assertOperands({ A, B });
  const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
  const content = `{"Relation":"XOr","A":"${canonicalA}","B":"${canonicalB}"}`;
  return ipfsAdd(content);
}

module.exports = {
  TYPES,
  analogy,
  and,
  identity,
  implies,
  improves,
  isa,
  negation,
  or,
  xor,
};
