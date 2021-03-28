const minimist = require('minimist');

module.exports = ({ argv, env }) => {
  const args = minimist(argv.slice(2));

  return args;
};
