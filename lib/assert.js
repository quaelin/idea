const isCID = require('./isCID');

function assertCid(value) {
  function throwError() {
    throw new TypeError(`Not a valid cid: ${value}`);
  }
  try {
    if (!isCID(value)) throwError();
  } catch (ex) {
    throwError();
  }
}

function assertString(val) {
  const type = typeof val;
  if (type !== 'string') {
    throw new TypeError(`Expected string, got type: ${type}`);
  }
}

module.exports = { assertCid, assertString };
