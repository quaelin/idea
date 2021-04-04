const CID = require('cids');

function isCID(val) {
  try {
    return CID.isCID(new CID(val));
  } catch (ex) {
    return false;
  }
}

module.exports = isCID;
