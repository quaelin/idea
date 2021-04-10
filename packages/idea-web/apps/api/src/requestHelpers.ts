import * as CID from 'cids';
import { Request, Response } from 'express';
import { HandlerFunction } from './types';

export function assertCid(val: string) {
  try {
    if (!CID.isCID(new CID(val))) {
      throw new TypeError();
    }
  } catch (ex) {
    throw new TypeError('Not a CID');
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
