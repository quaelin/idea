const { expectTypeError, ipfsTestConfig } = require('../../helpers');
const idea = require('../../..')({ ipfsConfig: ipfsTestConfig });

describe('idea.relation.*', () => {
  const iCid = 'QmXhqJntChQ4WAQZrGuzGnD5Lwpm1DoLjASJfmLD8Q51q7';
  const iCid2 = 'Qme3ZcMHqDUphNALrfAvgDmW3RZkhyZK2FbESDtzV98fbi';
  const iCid3 = 'Qma2d3zYG18HXJLciXBvE29Bsw9Gw3xbYfPuzgGz8BEiBd';

  describe('idea.relation.analogy()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.analogy('foo')));

      test('only three CIDs', () => expectTypeError(idea.relation.analogy(iCid, iCid2, iCid3)));
    });
  });

  describe('idea.relation.and()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.and()));

      test('non-CID string', () => expectTypeError(idea.relation.and('foo')));

      test('only one CID', () => expectTypeError(idea.relation.and(iCid)));
    });
  });

  describe('idea.relation.identity()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.identity()));

      test('non-CID string', () => expectTypeError(idea.relation.identity('foo')));

      test('only one CID', () => expectTypeError(idea.relation.identity(iCid)));
    });
  });

  describe('idea.relation.implies()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.implies('foo')));

      test('only one CID', () => expectTypeError(idea.relation.implies(iCid)));
    });
  });

  describe('idea.relation.improves()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.improves('foo')));

      test('only one CID', () => expectTypeError(idea.relation.improves(iCid)));
    });
  });

  describe('idea.relation.isa()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.isa('foo')));

      test('only one CID', () => expectTypeError(idea.relation.isa(iCid)));
    });
  });

  describe('idea.relation.negation()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.negation()));

      test('boolean', () => expectTypeError(idea.relation.negation(true)));

      test('number', () => expectTypeError(idea.relation.negation(0x65)));

      test('non-CID string', () => expectTypeError(idea.relation.negation('foo')));
    });
  });

  describe('idea.relation.or()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.or('foo')));

      test('only one CID', () => expectTypeError(idea.relation.or(iCid)));
    });
  });

  describe('idea.relation.xor()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.xor('foo')));

      test('only one CID', () => expectTypeError(idea.relation.xor(iCid)));
    });
  });
});
