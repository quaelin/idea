const minimist = require('minimist');

module.exports = ({ argv, env }) => {
  const args = minimist(argv.slice(2));

  args.ipfsConfig = { http: env.IDEA_IPFS_HTTP || 'http://localhost:5001/api/v0' };

  return args;
};
