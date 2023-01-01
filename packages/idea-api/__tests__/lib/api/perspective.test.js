import { expectTypeError, ipfsTestConfig } from '../../helpers';

import { initApi } from '../../..';

const idea = initApi({ ipfsConfig: ipfsTestConfig });

describe('idea.perspective.*', () => {
  const iCid = 'QmXhqJntChQ4WAQZrGuzGnD5Lwpm1DoLjASJfmLD8Q51q7';
  const iCid2 = 'Qme3ZcMHqDUphNALrfAvgDmW3RZkhyZK2FbESDtzV98fbi';
  const iCid3 = 'Qma2d3zYG18HXJLciXBvE29Bsw9Gw3xbYfPuzgGz8BEiBd';

  describe('idea.perspective.average()', () => {
    describe('throws TypeError for bad arguments', () => {
      test('no args', () => expectTypeError(idea.perspective.average()));

      test('boolean', () => expectTypeError(idea.perspective.average(true)));

      test('number', () => expectTypeError(idea.perspective.average(0x65)));

      test('non-CID string', () => expectTypeError(idea.perspective.average('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.average(iCid, { p: false })));
    });

    test('correctly averages', async () => {
      const pCidA = await idea.perspective.merge({
        [iCid]: -1,
        [iCid2]: 0.8,
      });
      const perspectiveB = {
        [iCid]: 0.8,
        [iCid2]: -0.4,
      };
      const pCidC = await idea.perspective.merge({ [iCid2]: 0.2 });

      const averaged = await idea.perspective.get(
        await idea.perspective.average(pCidA, perspectiveB, pCidC)
      );

      expect(averaged).toMatchObject({
        [iCid]: -0.1,
        [iCid2]: 0.2,
      });
    });
  });

  describe('idea.perspective.get()', () => {
    describe('throws TypeError if the argument is not a CID', () => {
      test('no args', () => expectTypeError(idea.perspective.get()));

      test('boolean', () => expectTypeError(idea.perspective.get(true)));

      test('number', () => expectTypeError(idea.perspective.get(0x65)));

      test('non-CID string', () => expectTypeError(idea.perspective.get('foo')));
    });
  });

  describe('idea.perspective.intersect()', () => {
    describe('throws TypeError for bad arguments', () => {
      test('no args', () => expectTypeError(idea.perspective.intersect()));

      test('non-CID string', () => expectTypeError(idea.perspective.intersect('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.intersect(iCid, { p: false })));
    });

    test('intersects correctly', async () => {
      const pCidA = await idea.perspective.merge({
        [iCid]: -0.5,
        [iCid2]: 0.6,
      });
      const pCidB = await idea.perspective.merge({
        [iCid2]: -0.4,
        [iCid3]: 1,
      });
      const intersection = await idea.perspective.get(
        await idea.perspective.intersect(pCidA, pCidB)
      );
      expect(intersection).toMatchObject({ [iCid2]: 0.1 });
    });
  });

  describe('idea.perspective.keys()', () => {
    describe('throws TypeError if the argument is not a CID', () => {
      test('no args', () => expectTypeError(idea.perspective.keys()));

      test('non-CID string', () => expectTypeError(idea.perspective.keys('foo')));
    });

    test('correctly returns the iCid keys, sorted', async () => {
      const pCid = await idea.perspective.merge({
        [iCid]: 0.1,
        [iCid2]: 0.2,
        [iCid3]: 0.3,
      });
      const keys = await idea.perspective.keys(pCid);
      expect(keys).toMatchObject([iCid, iCid2, iCid3].sort());
    });
  });

  describe('idea.perspective.merge()', () => {
    describe('throws TypeError for bad arguments', () => {
      test('non-CID string', () => expectTypeError(idea.perspective.merge('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.merge(iCid, { p: false })));
    });

    test('when merging 2+ perspectives that share iCids, the last value takes precedence', async () => {
      const merged = await idea.perspective.get(await idea.perspective.merge(
        {
          [iCid]: 0.1,
          [iCid2]: 0.1,
          [iCid3]: 0.1,
        },
        { [iCid]: 0.2 },
        { [iCid2]: 0.3 }
      ));
      expect(merged).toMatchObject({
        [iCid]: 0.2,
        [iCid2]: 0.3,
        [iCid3]: 0.1,
      });
    });
  });

  describe('idea.perspective.neutralize()', () => {
    describe('throws TypeError if the argument is not a CID', () => {
      test('non-CID string', () => expectTypeError(idea.perspective.neutralize('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.neutralize({ p: false })));
    });

    test('produces a perspective with same iCids, but all values set to 0', async () => {
      const neutralized = await idea.perspective.get(await idea.perspective.neutralize({
        [iCid]: 0.1,
        [iCid2]: 0.2,
        [iCid3]: -0.3,
      }));
      expect(neutralized).toMatchObject({
        [iCid]: 0,
        [iCid2]: 0,
        [iCid3]: 0,
      });
    });
  });

  describe('idea.perspective.polarize()', () => {
    describe('throws TypeError if the argument is not a CID', () => {
      test('non-CID string', () => expectTypeError(idea.perspective.polarize('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.polarize({ p: false })));

      test('CID first arg, but incorrect factor', () => expectTypeError(idea.perspective.polarize(iCid, 10)));
    });

    describe('polarization factor math', () => {
      test('-1 reduces all values to 0', async () => {
        const polarized = await idea.perspective.get(await idea.perspective.polarize({
          [iCid]: 0.5,
          [iCid2]: -0.5,
        }, -1));
        expect(polarized).toMatchObject({
          [iCid]: 0,
          [iCid2]: 0,
        });
      });

      test('-0.5 reduces all absolute values by half', async () => {
        const polarized = await idea.perspective.get(await idea.perspective.polarize({
          [iCid]: 0.4,
          [iCid2]: -0.4,
        }, -0.5));
        expect(polarized).toMatchObject({
          [iCid]: 0.2,
          [iCid2]: -0.2,
        });
      });

      test('0 leaves all values the same, thus returning the same pCid', async () => {
        const origCid = await idea.perspective.merge({
          [iCid]: 0.5,
          [iCid2]: -0.5,
        });
        const polarizedCid = await idea.perspective.polarize(origCid, 0);
        expect(origCid).toBe(polarizedCid);
      });

      test('0.5 reduces the distance to -1 and 1 by half', async () => {
        const polarized = await idea.perspective.get(await idea.perspective.polarize({
          [iCid]: 0.4,
          [iCid2]: -0.4,
        }, 0.5));
        expect(polarized).toMatchObject({
          [iCid]: 0.7,
          [iCid2]: -0.7,
        });
      });

      test('1 increases all absolute values to 1', async () => {
        const polarized = await idea.perspective.get(await idea.perspective.polarize({
          [iCid]: 0.5,
          [iCid2]: -0.5,
        }, 1));
        expect(polarized).toMatchObject({
          [iCid]: 1,
          [iCid2]: -1,
        });
      });
    });
  });

  describe('idea.perspective.scope()', () => {
    describe('throws TypeError for bad arguments', () => {
      test('non-CID string', () => expectTypeError(idea.perspective.scope('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.scope(iCid, { p: false })));
    });
  });

  describe('idea.perspective.skew()', () => {
    describe('throws TypeError for bad arguments', () => {
      test('non-CID string', () => expectTypeError(idea.perspective.skew('foo')));

      test('non-perspective object', () => expectTypeError(idea.perspective.skew(iCid, { p: false })));

      test('valid pexes, but invalid skew factor', () => expectTypeError(idea.perspective.skew(iCid, iCid2, true)));
    });

    test('skews correctly', async () => {
      const skewed = await idea.perspective.get(await idea.perspective.skew(
        {
          [iCid]: -1,
          [iCid2]: 0.6,
        },
        {
          [iCid]: 1,
          [iCid2]: 0.4,
        },
        -0.5 // skew somewhat towards first perspective
      ));
      expect(skewed).toMatchObject({
        [iCid]: -0.5,
        [iCid2]: 0.55,
      });
    });
  });
});
