/* eslint-disable global-require */
const { RELATION_TYPES } = require('./src/relationTypes');

function initApi(options) {
  const ipfsClient = require('./src/ipfs')(options && options.ipfsConfig);

  return {
    ...require('./src/api/idea')(ipfsClient, options),
    perspective: require('./src/api/perspective')(ipfsClient, options),
    relation: require('./src/api/relation')(ipfsClient, options),
  };
}

module.exports = { RELATION_TYPES, initApi };
