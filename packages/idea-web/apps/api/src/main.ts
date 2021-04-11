/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { initApi } from '@quaelin/idea-api';
import * as express from 'express';
import { routeIdeaGet } from './routes/idea/get';
import { routeIdeaPost } from './routes/idea/post';

const app = express();
const ipfsConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://localhost:5001/api/v0' };

app.use('*', (req, res, next) => {
  req.idea = initApi({ ipfsConfig });
  next();
});

routeIdeaGet(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
