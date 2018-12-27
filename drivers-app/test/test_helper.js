const mongoose = require('mongoose');

before(done => {
  console.log(process.env.NODE_ENV);
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
    .then(() => done())
    .catch(() => done());
})