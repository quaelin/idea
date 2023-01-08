import * as CID from 'cids';
import { Request, Response } from 'express';
import { HandlerFunction, Perspective } from './types';
import { BadInputs } from './httpErrors';

export function isCid(val: string) {
  try {
    return CID.isCID(new CID(val));
  } catch (ex) {
    return false;
  }
}

export function assertCid(val: string) {
  if (!isCid(val)) {
    throw new BadInputs(`Not a CID: ${val}`);
  }
}

export function assertValuation(val: number) {
  if (typeof val !== 'number' || val < -1 || val > 1) {
    throw new BadInputs(`Not a Valuation: ${val}`);
  }
}

function isObject(val) {
  return val && typeof val === 'object';
}

export function assertPerspective(perspective: Perspective) {
  if (!isObject(perspective)) {
    throw new BadInputs('Not a Perspective hash');
  }
  Object.keys(perspective).map((key) => {
    assertCid(key);
    assertValuation(perspective[key]);
  });
}

export function wrapErrors(handler: HandlerFunction) {
  return async function (req: Request, res: Response, next) {
    try {
      return await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}
