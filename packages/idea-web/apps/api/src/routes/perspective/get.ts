import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routePerspectiveGet(app: Application) {
  app.get('/api/perspective/:pCid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { pCid } } = req;
    assertCid(pCid);
    res.status(200)
      .set('Cache-Control', 'Public')
      .json(await idea.perspective.get(pCid));
  }));
}
