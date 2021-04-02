/* eslint-disable global-require */
module.exports = (options) => {
  const ipfsClient = require('./lib/ipfs')(options && options.ipfsConfig);

  return {
    ...require('./lib/api/idea')(ipfsClient, options),
    perspective: require('./lib/api/perspective')(ipfsClient, options),
    relation: require('./lib/api/relation')(ipfsClient, options),
  };
};
