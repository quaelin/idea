import { startsWith } from 'lodash';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { IdeaWebRequest } from '../../types';
import { wrapErrors } from '../../requestHelpers';
import { BadInputs } from '../../httpErrors';

export function routeIdeaPost(app: Application) {
  app.post('/api/idea', bodyParser.text(), wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, body, headers } = req;
    if (!startsWith(headers['content-type'], 'text/plain')) {
      throw new BadInputs('content type must be text/plain');
    }
    const icid = await idea.add(`${body}`);
    res.status(201)
      .set('content-type', 'text/plain')
      .send(icid);
  }));
}
