function perspective_get(args) {

}

function perspective_intersect(args) {

}

function perspective_keys(args) {

}

function perspective_merge(args) {

}

function perspective_neutralize(args) {

}

function perspective_polarize(args) {

}

function perspective_scope(args) {

}

function perspective_skew(args) {

}

function perspective_unknown(firstArg) {
  console.error(`Unknown perspective subcommand: ${firstArg}`);
}

module.exports = (args) => {
  const firstArg = args._.shift();

  switch (firstArg) {
    case 'get': return perspective_get(args);
    case 'intersect': return perspective_intersect(args);
    case 'keys': return perspective_keys(args);
    case 'merge': return perspective_merge(args);
    case 'neutralize': return perspective_neutralize(args);
    case 'polarize': return perspective_polarize(args);
    case 'scope': return perspective_scope(args);
    case 'skew': return perspective_skew(args);
    default: return perspective_unknown(firstArg);
  }
};
