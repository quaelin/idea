import minimist from 'minimist';

export function parseArgs({ argv, env }) {
  const args = minimist(argv.slice(2));

  args.ipfsConfig = { http: env.IDEA_IPFS_HTTP || 'http://127.0.0.1:5001/api/v0' };

  return args;
}
