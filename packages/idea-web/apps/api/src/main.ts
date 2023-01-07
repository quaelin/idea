/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { routeIdeaGet } from './routes/idea/get';
import { routeIdeaPost } from './routes/idea/post';
import { routeRelationPost } from './routes/relation/post';

import type { ApiOptions, IdeaApi, IdeaWebRequest } from './types';

const dynamicImport = async (packageName: string) => new Function(`return import('${packageName}')`)();

const app = express();
const ipfsConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://127.0.0.1:5001/api/v0' };

async function loadApi(): Promise<IdeaApi> {
  const { initApi } = await dynamicImport('@quaelin/idea-api');
  return initApi({ ipfsConfig } as ApiOptions);
}

app.use('*', (req: IdeaWebRequest, res, next) => {
  loadApi().then((ideaApi) => {
    req.idea = ideaApi;
    next();
  });
});

routeIdeaGet(app);
routeIdeaPost(app);
routeRelationPost(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
