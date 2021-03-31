const { isFinite } = require('lodash');

function isValuation(val) {
  return isFinite(val) && val >= -1 && val <= 1;
}

module.exports = isValuation;
