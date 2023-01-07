import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routePerspectiveGet(app: Application) {
  app.get('/api/idea/:pCid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { pCid } } = req;
    assertCid(pCid);
    res.json(await idea.perspective.get(pCid));
  }));
}
