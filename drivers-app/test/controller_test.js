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

  it('PUT to api/drivers/:id updats the driver', done => {
    const driver = new Driver({ email: 'kzu@kzu.com', driving: false });

    driver.save()
      .then(() => {
        request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, res) => {
          Driver.findOne({ email: 'kzu@kzu.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            })
        })
      })
  });
});
