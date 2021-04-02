const { expectTypeError, ipfsTestConfig } = require('../../helpers');
const idea = require('../../..')({ ipfsConfig: ipfsTestConfig });

describe('idea.relation.*', () => {
  const realCid = 'QmXhqJntChQ4WAQZrGuzGnD5Lwpm1DoLjASJfmLD8Q51q7';

  describe('idea.relation.identity()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.identity()));

      test('boolean', () => expectTypeError(idea.relation.identity(true)));

      test('number', () => expectTypeError(idea.relation.identity(0x65)));

      test('non-CID string', () => expectTypeError(idea.relation.identity('foo')));

      test('only one CID', async () => expectTypeError(idea.relation.identity(realCid)));
    });
  });
});
