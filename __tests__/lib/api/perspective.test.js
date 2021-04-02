const { expectTypeError, ipfsTestConfig } = require('../../helpers');
const idea = require('../../..')({ ipfsConfig: ipfsTestConfig });
// const { assertCid: expectCid } = require('../../../lib/assert');

describe('idea.perspective.*', () => {
  describe('idea.perspective.get()', () => {
    describe('throws TypeError if the argument is not a CID', () => {
      test('no args', () => expectTypeError(idea.perspective.get()));

      test('boolean', () => expectTypeError(idea.perspective.get(true)));

      test('number', () => expectTypeError(idea.perspective.get(0x65)));

      test('non-CID string', () => expectTypeError(idea.perspective.get('foo')));
    });
  });
});
