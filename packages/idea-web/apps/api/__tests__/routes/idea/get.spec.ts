import * as express from 'express';
import * as request from "supertest";
import { routeIdeaGet } from '../../../src/routes/idea/get';
import { testApp } from '../../helpers';

describe('GET /api/idea/:icid', () => {
  let app: express.Application;

  beforeEach(() => {
    app = testApp();
    routeIdeaGet(app);
  });

  test('invalid CID param results in 400 error', async () => {
    const { status } = await request(app).get('/api/idea/13');
    expect(status).toBe(400);
  });
});
