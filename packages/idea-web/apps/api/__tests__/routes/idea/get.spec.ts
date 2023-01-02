import * as express from 'express';
import * as request from "supertest";
import { routeIdeaGet } from '../../../src/routes/idea/get';
import { routeIdeaPost } from '../../../src/routes/idea/post';
import { testApp } from '../../helpers';

describe('GET /api/idea/:icid', () => {
  let app: express.Application;

  beforeEach(() => {
    app = testApp();
    routeIdeaGet(app);
    routeIdeaPost(app);
  });

  test('invalid CID param results in 400 error', async () => {
    const { status } = await request(app).get('/api/idea/13');
    expect(status).toBe(400);
  });

  test('adding then getting content gives expected result', async () => {
    const ideaContent = 'This is an idea';
    const { text: icid } = await request(app)
      .post('/api/idea')
      .set('content-type', 'text/plain')
      .send(ideaContent);
    const response = await request(app).get(`/api/idea/${icid}`);
    const { status, headers, text: retrievedContent } = response;
    expect(status).toBe(200);
    expect(headers['content-type']).toEqual(expect.stringMatching(/^text\/plain.*/));
    expect(retrievedContent).toBe(ideaContent);
  });
});
