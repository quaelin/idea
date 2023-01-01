import isFinite from 'lodash/isFinite.js';

export function isValuation(val) {
  return isFinite(val) && val >= -1 && val <= 1;
}
