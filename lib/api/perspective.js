const { assign, each, isFinite, isObject, keys: objKeys, map } = require('lodash');
const assertCid = require('../assertCid');
const ipfs = require('../ipfs');
const isCID = require('../isCID');
const isValuation = require('../isValuation');

function assertFactor(val) {
  if (!isFinite(val) || val < 0 || val > 1) {
    throw TypeError('Factor must be a number between 0 and 1');
  }
}

function assertValuation(val) {
  if (!isValuation(val)) {
    throw TypeError(`Not a valuation: ${val}`);
  }
}

function assertPex(pex) {
  if (isObject(pex)) {
    each(pex, (val, key) => {
      assertCid(key);
      assertValuation(val);
    });
  } else {
    assertCid(pex);
  }
}

function assertPexes(pexes) {
  each(pexes, assertPex);
}

function canonicalOrderJson(perspectiveHash) {
  const sortedKeys = objKeys(perspectiveHash).sort();
  const jsonParts = ['{'];
  each(sortedKeys, (key, i) => {
    jsonParts.push(`"${key}":${perspectiveHash[key]}`);
    if (i < sortedKeys.length - 1) jsonParts.push(',');
  });
  jsonParts.push('}');
  return jsonParts.join('');
}

async function get(pCid) {
  assertCid(pCid);
  const parsed = await ipfs.getJson(pCid);
  each(parsed, (valuation, iCid) => {
    assertCid(iCid);
    assertValuation(valuation);
  });
  return parsed;
}

async function pexesToHashes(pexes) {
  return Promise.all(map(pexes, async (pex) => {
    if (isCID(pex)) return get(pex);
    return pex;
  }));
}

async function intersect(...pexes) {
  assertPexes(pexes);
}

async function keys(pCid) {
  assertCid(pCid);
}

async function merge(...pexes) {
  assertPexes(pexes);
  const merged = assign({}, ...await pexesToHashes(pexes));
  const content = canonicalOrderJson(merged);
  return ipfs.addContent(content);
}

async function neutralize(pex) {
  assertPex(pex);
}

async function polarize(pex, factor) {
  assertPex(pex);
  assertFactor(factor);
}

async function scope(pexA, pexB) {
  assertPexes([pexA, pexB]);
}

async function skew(pexA, pexB, factor) {
  assertPexes([pexA, pexB]);
  assertFactor(factor);
}

module.exports = {
  get,
  intersect,
  keys,
  merge,
  neutralize,
  polarize,
  scope,
  skew,
};
