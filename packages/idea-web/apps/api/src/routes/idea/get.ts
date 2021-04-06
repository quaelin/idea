import { Express } from 'express';

export function routeIdeaGet(app: Express) {
  app.get('/api/idea/:icid', async (req, res) => {
    const { idea, params } = req;
    const content = await idea.get(params.icid);
    res.send(content);
  });
}
