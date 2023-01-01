import { isCID } from './isCID';

export function assertCid(value) {
  function throwError() {
    throw new TypeError(`Not a valid cid: ${value}`);
  }
  try {
    if (!isCID(value)) throwError();
  } catch (ex) {
    throwError();
  }
}

export function assertString(val) {
  const type = typeof val;
  if (type !== 'string') {
    throw new TypeError(`Expected string, got type: ${type}`);
  }
}
