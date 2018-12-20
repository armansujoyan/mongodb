const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true });

before((done) => {
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const {
    users,
    comments,
    blogposts,
    books,
  } = mongoose.connection.collections;

  users.drop(() => {
    books.drop(() => {
      blogposts.drop(() => {
        comments.drop(() => {
          done();
        });
      });
    });
  });
});
