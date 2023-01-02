import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routeIdeaGet(app: Application) {
  app.get('/api/idea/:icid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { icid } } = req;
    assertCid(icid);
    const content = await idea.get(icid);
    if (typeof content === 'string') {
      res.set('content-type', 'text/plain').send(content);
    } else {
      res.json(content);
    }
  }));
}
