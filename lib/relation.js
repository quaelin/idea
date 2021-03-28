async function analogy(A, B, C, D) {
  const content = `{"Relation":"Analogy","A":"${A}","B":"${B}","C":"${C}","D":"${D}"}`;
  return content;
}

async function and(A, B) {
  const content = `{"Relation":"And","A":"${A}","B":"${B}"}`;
  return content;
}

async function implies(A, B) {
  const content = `{"Relation":"Implies","A":"${A}","B":"${B}"}`;
  return content;
}

async function improves(A, B) {
  const content = `{"Relation":"Improves","A":"${A}","B":"${B}"}`;
  return content;
}

async function isa(A, B) {
  const content = `{"Relation":"IsA","A":"${A}","B":"${B}"}`;
  return content;
}

async function negation(A) {
  const content = `{"Relation":"Negation","A":"${A}"}`;
  return content;
}

async function or(A, B) {
  const content = `{"Relation":"Or","A":"${A}","B":"${B}"}`;
  return content;
}

async function xor(A, B) {
  const content = `{"Relation":"XOr","A":"${A}","B":"${B}"}`;
  return content;
}

module.exports = {
  analogy,
  and,
  implies,
  improves,
  isa,
  negation,
  or,
  xor,
};
