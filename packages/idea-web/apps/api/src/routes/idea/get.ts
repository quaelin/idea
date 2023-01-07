import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routeIdeaGet(app: Application) {
  app.get('/api/idea/:iCid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { iCid } } = req;
    assertCid(iCid);
    const content = await idea.get(iCid);
    if (typeof content === 'string') {
      res.set('content-type', 'text/plain').send(content);
    } else {
      res.json(content);
    }
  }));
}
