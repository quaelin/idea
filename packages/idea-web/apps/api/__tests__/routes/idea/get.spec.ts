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

  test('hello world', async () => {
    const response = await request(app).get('/api/idea/13');
    expect(response).toMatchObject({
      status: 500,
    });
  });
});
