const assert = require('assert');
const Book = require('../src/book');

describe('Book deletion tests', () => {
  let book;

  beforeEach((done) => {
    book = new Book({ name: 'Dict', pages: 220 });
    book.save()
      .then(() => done());
  });

  it('Should delete the book by object.', (done) => {
    book.remove()
      .then(() => Book.findOne({ name: 'Dict' }))
      .then((book) => {
        assert(book === null);
        done();
      });
  });
});
