import * as CID from 'cids';
import { Request, Response } from 'express';
import { HandlerFunction } from './types';
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

export function wrapErrors(handler: HandlerFunction) {
  return async function (req: Request, res: Response, next) {
    try {
      return await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}
