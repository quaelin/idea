import { Application } from 'express';
import { IdeaWebRequest } from '../../types';
import { assertCid, wrapErrors } from '../../requestHelpers';

export function routeIdeaGet(app: Application) {
  app.get('/api/idea/:icid', wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, params: { icid } } = req;
    assertCid(icid);
    const content = await idea.get(icid);
    if (content.Relation) {
      res.json(content);
    } else {
      res.send(content);
    }
  }));
}
