const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const Driver = mongoose.model('driver');

describe('Controller test.', () => {
  it('Post to api/drivers createa a new driver', (done) => {
    Driver.countDocuments()
      .then(count => {
        request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          Driver.countDocuments()
            .then(newCount => {
              assert(count + 1 === newCount)
              done();
            })
        });
      });
  });
});
