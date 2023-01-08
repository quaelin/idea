import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { IdeaWebRequest, Perspective } from '../../types';
import { assertPerspective, wrapErrors } from '../../requestHelpers';

export function routePerspectivePost(app: Application) {
  app.post('/api/perspective', bodyParser.json(), wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, body } = req;
    assertPerspective(body);
    const pCid = await idea.perspective.merge(body as Perspective);
    res.status(201)
      .set('content-type', 'text/plain')
      .send(pCid);
  }));
}
