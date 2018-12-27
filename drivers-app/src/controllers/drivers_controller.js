const Driver = require('../models/driver');

module.exports = {
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.find({
      geometry: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [ lng, lat ]
            },
            $minDistance: 0,
            $maxDistance: 110000
          }
      }
    })
    .then(drivers => res.send(drivers))
    .catch(next);
  },

  greeting(req, res) {
    res.send({ text: "hello" });
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  update(req, res, next) {
    const updateProps = req.body;
    const driverId = req.params.id;

    Driver.findByIdAndUpdate(driverId, updateProps)
      .then(driver => Driver.findById(driverId)
        .then(driverById => res.send(driverById)))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove(driverId)
      .then(driver => res.status(204).send(driver))
      .catch(next);
  },
};
