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

  it('DELETE to api/driver/:id deletes a driver', done => {
    const driver = new Driver({ email: 'ku@ku.com', driving: false });

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err, res) => {
            Driver.findOne({ email: "ku@ku.com" })
              .then(driver => {
                assert(driver === null);
                done();
              })
          })
      })
  });

  it('GET to api/drivers finds drivers in a location', done => {
    const yerevanDriver = new Driver({
      email: 'yerevan@arm.com',
      geometry: { type: 'Point', coordinates: [44.4991, 40.1792] }
    });

    const usDriver = new Driver({
      email: 'us@us.com',
      geometry: { type: 'Point', coordinates: [104.9903, 39.7392] }
    });

    Promise.all([yerevanDriver.save(), usDriver.save()])
      .then(() => {
        request(app)
          .get(`/api/drivers?lng=45&lat=40`)
          .end((err, res) => {
            assert(res.body.length === 1);
            assert(res.body[0].email === 'yerevan@arm.com');
            done();
          })
      })
  })
});
