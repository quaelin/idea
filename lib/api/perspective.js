const { each, isFinite, isObject } = require('lodash');
const assertCid = require('../assertCid');

function assertFactor(val) {
  if (!isFinite(val) || val < 0 || val > 1) {
    throw TypeError('Factor must be a number between 0 and 1');
  }
}

function assertValuation(val) {
  if (!isFinite(val) || val < -1 || val > 1) {
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

async function get(pCid) {
  assertCid(pCid);
}

async function intersect(...pexes) {
  assertPexes(pexes);
}

async function keys(pCid) {
  assertCid(pCid);
}

async function merge(...pexes) {
  assertPexes(pexes);
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
