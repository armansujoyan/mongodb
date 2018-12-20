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
});
