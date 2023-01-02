import { initApi } from '@quaelin/idea-api';
import * as express from 'express';
import { IdeaWebRequest } from '../src/types';

const ipfsConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://127.0.0.1:5001/api/v0' };

export function testApp() {
  const app = express();

  app.use('*', (req: IdeaWebRequest, res, next) => {
    req.idea = initApi({ ipfsConfig });
    next();
  });

  return app;
}
