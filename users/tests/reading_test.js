const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;
  let Boe;
  let Doe;
  let Goe;

  beforeEach((done) => {
    Boe = new User({ name: 'Boe' });
    Doe = new User({ name: 'Doe' });
    Goe = new User({ name: 'Goe' });
    joe = new User({ name: 'Joe' });
    Promise.all([Boe.save(), joe.save(), Doe.save(), Goe.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('Can skip and limit the result of a set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Doe');
        assert(users[1].name === 'Goe');
        done();
      });
  });
});
