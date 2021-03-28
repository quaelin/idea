function idea_add(args) {

}

function idea_get(args) {

}

function idea_unknown(firstArg) {
  console.error(`Unknown idea subcommand: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'add': return idea_add(args);
    case 'get': return idea_get(args);
    default: return idea_unknown(firstArg);
  }
};
