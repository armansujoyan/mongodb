const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');

describe('The express app', () => {
  it('Handles a GET to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.text === 'hello');
        done();
      })
  });
});
