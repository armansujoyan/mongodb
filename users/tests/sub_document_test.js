const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('Can create a sub-documents', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'JS DOM' }] });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'JS DOM');
        done();
      });
  });

  it('Can add new records to subdocuments', (done) => {
    const joe = new User({ name: 'Joe', posts: [] });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Hello world' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Hello world');
        done();
      });
  });

  it('Can remove a record from database', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'New title' }] });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
