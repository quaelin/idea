const isCID = require('./isCID');

function assertCid(value) {
  try {
    if (!isCID(value)) throw new Error();
  } catch (ex) {
    throw new TypeError(`Not a valid cid: ${value}`);
  }
}

module.exports = assertCid;
