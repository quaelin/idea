import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routePerspectiveGet(app: Application) {
  app.get('/api/idea/:pcid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { pcid } } = req;
    assertCid(pcid);
    res.json(await idea.perspective.get(pcid));
  }));
}
