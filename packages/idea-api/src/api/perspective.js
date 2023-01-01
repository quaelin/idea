import lodash from 'lodash';
import { assertCid } from '../assert.js';
import { isCID } from '../isCID.js';
import { isValuation } from '../isValuation.js';

const { assign, each, has, isObject, keys: objKeys, map, mapValues } = lodash;

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

const safetyFactor = 1000; // Minimize floating point math bugs
const avg = (arr) => arr.map((valuation) => valuation * safetyFactor)
  .reduce((p, c) => p + c, 0) / (arr.length * safetyFactor);

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

function collateValuations(perspectives) {
  const collated = {};
  each(perspectives, (perspective) => {
    each(perspective, (valuation, iCid) => {
      collated[iCid] = collated[iCid] || [];
      collated[iCid].push(valuation);
    });
  });
  return collated;
}

export function initPerspectiveApi(ipfs) {
  async function get(pCid) {
    assertCid(pCid);
    const parsed = await ipfs.getJson(pCid);
    each(parsed, (valuation, iCid) => {
      assertCid(iCid);
      assertValuation(valuation);
    });
    return parsed;
  }

  async function pexesToHashes(pexes, options) {
    if (has(options, 'num') && pexes.length !== options.num) {
      throw new TypeError(`Expected exactly ${options.num} perspective expressions`);
    }
    if (has(options, 'min') && pexes.length < options.min) {
      throw new TypeError(`Expected at least ${options.min} perspective expressions`);
    }
    if (has(options, 'max') && pexes.length > options.max) {
      throw new TypeError(`Expected at most ${options.min} perspective expressions`);
    }
    return Promise.all(map(pexes, async (pex) => {
      if (isCID(pex)) return get(pex);
      return pex;
    }));
  }

  async function average(...pexes) {
    assertPexes(pexes);
    const perspectives = await pexesToHashes(pexes, { min: 2 });
    const allValues = collateValuations(perspectives);
    const reduced = mapValues(allValues, avg);
    const content = canonicalOrderJson(reduced);
    return ipfs.addContent(content);
  }

  async function intersect(...pexes) {
    assertPexes(pexes);
    const perspectives = await pexesToHashes(pexes, { min: 2 });
    const allValues = collateValuations(perspectives);
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
    const merged = assign({}, ...await pexesToHashes(pexes, { min: 1 }));
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
      throw new TypeError(`Polarization factor must be a number between -1 and 1, not: ${factor}`);
    }
    const [perspective] = await pexesToHashes([pex]);
    const polarized = mapValues(perspective, (oldValue) => {
      if (!oldValue) return 0;
      if (!factor) return oldValue;
      const polarity = oldValue < 0 ? -1 : 1;
      const abs = Math.abs(oldValue);
      if (factor < 0) {
        return trimValuation(
          (((abs * safetyFactor) + (factor * abs * safetyFactor)) * polarity) / safetyFactor
        );
      }
      return trimValuation(
        (((abs * safetyFactor) + (factor * (1 - abs) * safetyFactor)) * polarity) / safetyFactor
      );
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

  async function skew(pexA, pexB, weighting) {
    assertPexes([pexA, pexB]);
    try {
      assertValuation(weighting);
    } catch (ex) {
      throw new TypeError(`Skew weighting must be a number between -1 and 1, not: ${weighting}`);
    }
    const [a, b] = await pexesToHashes([pexA, pexB]);
    const merged = collateValuations([a, b]);
    const skewed = mapValues(merged, ([fromVal, toVal]) => {
      const safeFromVal = fromVal * safetyFactor;
      const safeToVal = toVal * safetyFactor;
      const skewFactor = (weighting + 1) / 2;
      const safeSkewedVal = safeFromVal + (skewFactor * (safeToVal - safeFromVal));
      return trimValuation(safeSkewedVal / safetyFactor);
    });
    const content = canonicalOrderJson(skewed);
    return ipfs.addContent(content);
  }

  return {
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
}
