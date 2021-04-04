const { initApi } = require('@quaelin/idea-api');
const cli_idea = require('./cli/idea');
const cli_perspective = require('./cli/perspective');
const cli_relation = require('./cli/relation');

function cli_unknown(firstArg) {
  console.error(`Unknown idea command: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();
  const { ipfsConfig } = args;
  const idea = initApi({ ipfsConfig });

  switch (firstArg) {
    case 'idea': return cli_idea(idea, args);
    case 'perspective': return cli_perspective(idea, args);
    case 'relation': return cli_relation(idea, args);
    default: return cli_unknown(firstArg);
  }
};
