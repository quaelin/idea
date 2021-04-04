const { expectTypeError, ipfsTestConfig } = require('../../helpers');
const idea = require('../../..')({ ipfsConfig: ipfsTestConfig });

describe('idea.relation.*', () => {
  const iCid = 'QmXhqJntChQ4WAQZrGuzGnD5Lwpm1DoLjASJfmLD8Q51q7';
  const iCid2 = 'Qme3ZcMHqDUphNALrfAvgDmW3RZkhyZK2FbESDtzV98fbi';
  const iCid3 = 'Qma2d3zYG18HXJLciXBvE29Bsw9Gw3xbYfPuzgGz8BEiBd';
  const iCid4 = 'QmcgCZ8s2jwG8niRWhKtB8XdfyFZC78cGtTDwSPeFWbMxj';

  describe('idea.relation.analogy()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.analogy('foo')));

      test('only three CIDs', () => expectTypeError(idea.relation.analogy(iCid, iCid2, iCid3)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const relation = await idea.get(await idea.relation.analogy(iCid, iCid2, iCid3, iCid4));
      expect(relation).toMatchObject({
        Relation: 'Analogy',
        A: iCid,
        B: iCid2,
        C: iCid3,
        D: iCid4,
      });
    });
  });

  describe('idea.relation.and()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.and()));

      test('non-CID string', () => expectTypeError(idea.relation.and('foo')));

      test('only one CID', () => expectTypeError(idea.relation.and(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const [expectedA, expectedB] = [iCid, iCid2].sort();
      const relation = await idea.get(await idea.relation.and(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'And',
        A: expectedA,
        B: expectedB,
      });
    });

    test('commutative: different operand ordering yields same CID', async () => {
      // Though we're specifying the operands in different order, they should
      // get saved in the *same* order, so they should result in the same CID.
      const rCid1 = await idea.relation.identity(iCid, iCid2);
      const rCid2 = await idea.relation.identity(iCid2, iCid);
      expect(rCid1).toBe(rCid2);
    });
  });

  describe('idea.relation.identity()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.identity()));

      test('non-CID string', () => expectTypeError(idea.relation.identity('foo')));

      test('only one CID', () => expectTypeError(idea.relation.identity(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const [expectedA, expectedB] = [iCid, iCid2].sort();
      const relation = await idea.get(await idea.relation.identity(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'Identity',
        A: expectedA,
        B: expectedB,
      });
    });

    test('commutative: different operand ordering yields same CID', async () => {
      // Though we're specifying the operands in different order, they should
      // get saved in the *same* order, so they should result in the same CID.
      const rCid1 = await idea.relation.identity(iCid, iCid2);
      const rCid2 = await idea.relation.identity(iCid2, iCid);
      expect(rCid1).toBe(rCid2);
    });
  });

  describe('idea.relation.implies()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.implies('foo')));

      test('only one CID', () => expectTypeError(idea.relation.implies(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const relation = await idea.get(await idea.relation.implies(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'Implies',
        A: iCid,
        B: iCid2,
      });
    });

    test('non-commutative: different operand ordering yields different CID', async () => {
      const rCid1 = await idea.relation.implies(iCid, iCid2);
      const rCid2 = await idea.relation.implies(iCid2, iCid);
      expect(rCid1).not.toBe(rCid2);
    });
  });

  describe('idea.relation.improves()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.improves('foo')));

      test('only one CID', () => expectTypeError(idea.relation.improves(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const relation = await idea.get(await idea.relation.improves(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'Improves',
        A: iCid,
        B: iCid2,
      });
    });

    test('non-commutative: different operand ordering yields different CID', async () => {
      const rCid1 = await idea.relation.improves(iCid, iCid2);
      const rCid2 = await idea.relation.improves(iCid2, iCid);
      expect(rCid1).not.toBe(rCid2);
    });
  });

  describe('idea.relation.isa()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.isa('foo')));

      test('only one CID', () => expectTypeError(idea.relation.isa(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const relation = await idea.get(await idea.relation.isa(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'IsA',
        A: iCid,
        B: iCid2,
      });
    });

    test('non-commutative: different operand ordering yields different CID', async () => {
      const rCid1 = await idea.relation.isa(iCid, iCid2);
      const rCid2 = await idea.relation.isa(iCid2, iCid);
      expect(rCid1).not.toBe(rCid2);
    });
  });

  describe('idea.relation.negation()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('no args', () => expectTypeError(idea.relation.negation()));

      test('boolean', () => expectTypeError(idea.relation.negation(true)));

      test('number', () => expectTypeError(idea.relation.negation(0x65)));

      test('non-CID string', () => expectTypeError(idea.relation.negation('foo')));
    });

    test('relation can be loaded with idea.get()', async () => {
      const relation = await idea.get(await idea.relation.negation(iCid));
      expect(relation).toMatchObject({
        Relation: 'Negation',
        A: iCid,
      });
    });
  });

  describe('idea.relation.or()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.or('foo')));

      test('only one CID', () => expectTypeError(idea.relation.or(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const [expectedA, expectedB] = [iCid, iCid2].sort();
      const relation = await idea.get(await idea.relation.or(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'Or',
        A: expectedA,
        B: expectedB,
      });
    });

    test('commutative: different operand ordering yields same CID', async () => {
      // Though we're specifying the operands in different order, they should
      // get saved in the *same* order, so they should result in the same CID.
      const rCid1 = await idea.relation.or(iCid, iCid2);
      const rCid2 = await idea.relation.or(iCid2, iCid);
      expect(rCid1).toBe(rCid2);
    });
  });

  describe('idea.relation.xor()', () => {
    describe('throws TypeError if the arguments are not CIDs', () => {
      test('non-CID string', () => expectTypeError(idea.relation.xor('foo')));

      test('only one CID', () => expectTypeError(idea.relation.xor(iCid)));
    });

    test('relation can be loaded with idea.get()', async () => {
      const [expectedA, expectedB] = [iCid, iCid2].sort();
      const relation = await idea.get(await idea.relation.xor(iCid, iCid2));
      expect(relation).toMatchObject({
        Relation: 'XOr',
        A: expectedA,
        B: expectedB,
      });
    });

    test('commutative: different operand ordering yields same CID', async () => {
      // Though we're specifying the operands in different order, they should
      // get saved in the *same* order, so they should result in the same CID.
      const rCid1 = await idea.relation.xor(iCid, iCid2);
      const rCid2 = await idea.relation.xor(iCid2, iCid);
      expect(rCid1).toBe(rCid2);
    });
  });
});
