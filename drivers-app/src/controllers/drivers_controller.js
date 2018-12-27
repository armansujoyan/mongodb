const Driver = require('../models/driver');

module.exports = {
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
  }
};
