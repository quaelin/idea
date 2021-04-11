import * as express from 'express';
import * as request from "supertest";
import { routeIdeaPost } from '../../../src/routes/idea/post';
import { testApp } from '../../helpers';
import { isCid } from '../../../src/requestHelpers';

describe('POST /api/idea', () => {
  let app: express.Application;

  beforeEach(() => {
    app = testApp();
    routeIdeaPost(app);
  });

  test('passing a bad content-type results in a 400 error', async () => {
    const { status } = await request(app)
      .post('/api/idea')
      .set('Content-Type', 'application/json')
      .send('foo');
    expect(status).toBe(400);
  });

  test('adding a string returns an icid', async () => {
    const { status, headers, text } = await request(app)
      .post('/api/idea')
      .set('Content-Type', 'text/plain')
      .send('foo');
    expect(status).toBe(201);
    expect(headers['content-type']).toEqual(
      expect.stringMatching(/^text\/plain.*/)
    );
    expect(isCid(text)).toBe(true);
  });
});
