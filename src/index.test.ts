import request from 'supertest';
import { app } from '.';

it('Should', async (done) => {
  const res = await request(app).get('/api-doc');
  expect(res.status).toBe(200);
  done();
});
