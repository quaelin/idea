const CID = require('cids');

function assertCid(value) {
  try {
    if (!CID.isCID(new CID(value)))
      throw new Error();
  } catch (ex) {
    throw new TypeError(`Not a valid cid: ${value}`);
  }
}

module.exports = assertCid;
