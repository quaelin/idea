const { expectTypeError, ipfsTestConfig } = require('../../helpers');
const idea = require('../../..')({ ipfsConfig: ipfsTestConfig });
const { assertCid: expectCid } = require('../../../lib/assert');

const simpleText = 'foo';
const variousSpecialChars = '"<>\'&\n. `${}';

describe('idea.*', () => {
  describe('idea.add()', () => {
    describe('Attempts to pass in non-strings should always be rejected with a TypeError', () => {
      test('no args', () => expectTypeError(idea.add()));

      test('boolean', () => expectTypeError(idea.add(true)));

      test('number', () => expectTypeError(idea.add(5)));
    });

    describe('Successful calls result in a CID being returned', () => {
      test('simple text', async () => {
        expectCid(await idea.add(simpleText));
      });

      test('special characters', async () => {
        expectCid(await idea.add(variousSpecialChars));
      });
    });
  });

  describe('idea.get()', () => {
    describe('Invoking with a non-CID results in a TypeError', () => {
      test('no args', () => expectTypeError(idea.get()));

      test('boolean', () => expectTypeError(idea.get(true)));

      test('number', () => expectTypeError(idea.get(1337)));

      test('non-CID string', () => expectTypeError(idea.get('foo')));
    });

    describe('Text ideas are returned un-modified', () => {
      test('simple text', async () => {
        const cid = await idea.add(simpleText);
        expect(await idea.get(cid)).toBe(simpleText);
      });

      test('special characters', async () => {
        const cid = await idea.add(variousSpecialChars);
        expect(await idea.get(cid)).toBe(variousSpecialChars);
      });
    });

    describe('Relations are returned in the expected object structure', () => {
      test('Implies relation', async () => {
        const simpleCid = await idea.add(simpleText);
        const specialCid = await idea.add(variousSpecialChars);
        const rCid = await idea.relation.implies(specialCid, simpleCid);
        const relation = await idea.get(rCid);
        expect(relation).toMatchObject({
          Relation: 'Implies',
          A: specialCid,
          B: simpleCid,
        });
      });
    });
  });
});
