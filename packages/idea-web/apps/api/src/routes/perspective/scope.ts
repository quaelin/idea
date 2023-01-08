import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routePerspectiveScope(app: Application) {
  app.post(`/api/perspective/:pCidA/scope/:pCidB`, wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { pCidA, pCidB} } = req;
    assertCid(pCidA);
    assertCid(pCidB);
    const pCid = await idea.perspective.scope(pCidA, pCidB);
    res.status(201)
      .set('content-type', 'text/plain')
      .send(pCid);
  }));
}
