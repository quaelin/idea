import { initApi } from '@quaelin/idea-api';
import { ideaCli } from './idea.js';
import { perspectiveCli } from './perspective.js';
import { relationCli } from './relation.js';

function cli_unknown(firstArg) {
  console.error(`Unknown idea command: ${firstArg}`);
}

export function cli(args) {
  const firstArg = args._.shift();
  const { ipfsConfig } = args;
  const idea = initApi({ ipfsConfig });

  switch (firstArg) {
    case 'idea': return ideaCli(idea, args);
    case 'perspective': return perspectiveCli(idea, args);
    case 'relation': return relationCli(idea, args);
    default: return cli_unknown(firstArg);
  }
}
