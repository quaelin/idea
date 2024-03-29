/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { routeIdeaGet } from './routes/idea/get';
import { routeIdeaPost } from './routes/idea/post';
import { routeRelationPost } from './routes/relation/post';
import { routePerspectiveGet } from './routes/perspective/get';
import { routePerspectivePost } from './routes/perspective/post';
import { routePerspectiveScope } from './routes/perspective/scope';

import type { ApiOptions, IdeaApi, IdeaWebRequest } from './types';

const app = express();
const ipfsConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://127.0.0.1:5001/api/v0' };

// This is annoying, but regular import was't working due to downstream ipfs-client used by idea-api.
const dynamicImport = async (packageName: string) => new Function(`return import('${packageName}')`)();
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
routePerspectiveGet(app);
routePerspectivePost(app);
routePerspectiveScope(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
