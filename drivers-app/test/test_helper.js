const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/driverDbTest', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warnign', err);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.createIndex({ 'geometry': '2dsphere'}))
    .then(() => done())
    .catch(() => done());
})