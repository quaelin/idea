const minimist = require('minimist');

module.exports = ({ argv, env }) => {
  const args = minimist(argv.slice(2));

  args.port = args.port || 8080;

  args.ipfsConfig = { http: env.IDEA_IPFS_HTTP || 'http://localhost:5001/api/v0' };

  if (args.ipfs) {
    args.ipfsConfig.http = args.ipfs;
    delete args.ipfs;
  }

  return args;
};
