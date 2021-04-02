const { assign, each, has, isFinite, isObject, keys: objKeys, map, mapValues } = require('lodash');
const { assertCid } = require('../assert');
const ipfs = require('../ipfs');
const isCID = require('../isCID');
const isValuation = require('../isValuation');

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

const assertPexes = (pexes) => { each(pexes, assertPex); };

const avg = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

const trimValuation = (valuation) => Math.max(Math.min(valuation, 1), -1);

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

async function average(...pexes) {
  assertPexes(pexes);
  const perspectives = await pexesToHashes(pexes);
  const allValues = {};
  each(perspectives, (perspective) => {
    each(perspective, (valuation, iCid) => {
      allValues[iCid] = allValues[iCid] || [];
      allValues[iCid].push(valuation);
    });
  });
  const reduced = mapValues(allValues, avg);
  const content = canonicalOrderJson(reduced);
  return ipfs.addContent(content);
}

async function intersect(...pexes) {
  assertPexes(pexes);
  const perspectives = await pexesToHashes(pexes);
  const allValues = {};
  each(perspectives, (perspective) => {
    each(perspective, (valuation, iCid) => {
      allValues[iCid] = allValues[iCid] || [];
      allValues[iCid].push(valuation);
    });
  });
  const intersection = {};
  each(allValues, (values, iCid) => {
    if (values.length === perspectives.length) {
      intersection[iCid] = avg(values);
    }
  });
  const content = canonicalOrderJson(intersection);
  return ipfs.addContent(content);
}

async function keys(pCid) {
  assertCid(pCid);
  const perspective = await get(pCid);
  return objKeys(perspective);
}

async function merge(...pexes) {
  assertPexes(pexes);
  const merged = assign({}, ...await pexesToHashes(pexes));
  const content = canonicalOrderJson(merged);
  return ipfs.addContent(content);
}

async function neutralize(pex) {
  assertPex(pex);
  const [perspective] = await pexesToHashes([pex]);
  const neutralized = mapValues(perspective, () => 0);
  const content = canonicalOrderJson(neutralized);
  return ipfs.addContent(content);
}

async function polarize(pex, factor) {
  assertPex(pex);
  try {
    assertValuation(factor);
  } catch (ex) {
    throw TypeError(`Polarization factor must be a number between -1 and 1, not: ${factor}`);
  }
  const [perspective] = await pexesToHashes([pex]);
  const polarized = mapValues(perspective, (oldValue) => {
    if (!oldValue) return 0;
    if (!factor) return oldValue;
    const polarity = oldValue < 0 ? -1 : 1;
    const abs = Math.abs(oldValue);
    if (factor < 0) return trimValuation((abs + (factor / abs), 1) * polarity);
    return trimValuation((abs + (factor / (1 - abs))) * polarity);
  });
  const content = canonicalOrderJson(polarized);
  return ipfs.addContent(content);
}

async function scope(pexA, pexB) {
  assertPexes([pexA, pexB]);
  const [a, b] = await pexesToHashes([pexA, pexB]);
  const scoped = {};
  each(a, (valuation, iCid) => {
    if (has(b, iCid)) scoped[iCid] = valuation;
  });
  const content = canonicalOrderJson(scoped);
  return ipfs.addContent(content);
}

async function skew(pexA, pexB, factor) {
  assertPexes([pexA, pexB]);
  if (!isFinite(factor) || factor < 0 || factor > 1) {
    throw TypeError('Skew factor must be a number between 0 and 1');
  }
  const [a, b] = await pexesToHashes([pexA, pexB]);
  const merged = {};
  each([a, b], (perspective) => {
    each(perspective, (valuation, iCid) => {
      merged[iCid] = merged[iCid] || [];
      merged[iCid].push(valuation);
    });
  });
  const skewed = mapValues(merged, ([fromVal, toVal]) => (
    trimValuation(fromVal + (factor * (toVal - fromVal)))
  ));
  const content = canonicalOrderJson(skewed);
  return ipfs.addContent(content);
}

module.exports = {
  average,
  get,
  intersect,
  keys,
  merge,
  neutralize,
  polarize,
  scope,
  skew,
};
