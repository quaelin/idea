const cli_idea = require('./cli/idea');
const cli_perspective = require('./cli/perspective');
const cli_relation = require('./cli/relation');

function cli_unknown(firstArg) {
  console.error(`Unknown idea command: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'idea': return cli_idea(args);
    case 'perspective': return cli_perspective(args);
    case 'relation': return cli_relation(args);
    default: return cli_unknown(firstArg);
  }
};
