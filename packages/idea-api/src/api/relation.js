import each from 'lodash/each.js';
import has from 'lodash/has.js';

import { assertCid } from '../assert.js';

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

export function initRelationApi(ipfs) {
  async function analogy(A, B, C, D) {
    // May have 3 or 4 operands
    assertOperands({ A, B, C });
    if (D) assertOperands({ D });
    const content = D
      ? `{"Relation":"Analogy","A":"${A}","B":"${B}","C":"${C}","D":"${D}"}`
      : `{"Relation":"Analogy","A":"${A}","B":"${B}","C":"${C}"}`;
    return ipfs.addContent(content);
  }

  async function and(A, B) {
    assertOperands({ A, B });
    const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
    const content = `{"Relation":"And","A":"${canonicalA}","B":"${canonicalB}"}`;
    return ipfs.addContent(content);
  }

  async function identity(A, B) {
    assertOperands({ A, B });
    const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
    const content = `{"Relation":"Identity","A":"${canonicalA}","B":"${canonicalB}"}`;
    return ipfs.addContent(content);
  }

  async function implies(A, B) {
    assertOperands({ A, B });
    const content = `{"Relation":"Implies","A":"${A}","B":"${B}"}`;
    return ipfs.addContent(content);
  }

  async function improves(A, B) {
    assertOperands({ A, B });
    const content = `{"Relation":"Improves","A":"${A}","B":"${B}"}`;
    return ipfs.addContent(content);
  }

  async function isa(A, B) {
    assertOperands({ A, B });
    const content = `{"Relation":"IsA","A":"${A}","B":"${B}"}`;
    return ipfs.addContent(content);
  }

  async function negation(A) {
    assertOperands({ A });
    const content = `{"Relation":"Negation","A":"${A}"}`;
    return ipfs.addContent(content);
  }

  async function or(A, B) {
    assertOperands({ A, B });
    const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
    const content = `{"Relation":"Or","A":"${canonicalA}","B":"${canonicalB}"}`;
    return ipfs.addContent(content);
  }

  async function xor(A, B) {
    assertOperands({ A, B });
    const { canonicalA, canonicalB } = canonicalOrderForCommutativeOperands({ A, B });
    const content = `{"Relation":"XOr","A":"${canonicalA}","B":"${canonicalB}"}`;
    return ipfs.addContent(content);
  }

  return {
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
}
