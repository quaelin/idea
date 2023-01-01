import isFinite from 'lodash/isFinite';

export function isValuation(val) {
  return isFinite(val) && val >= -1 && val <= 1;
}
