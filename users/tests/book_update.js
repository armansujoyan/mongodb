const assert = require('assert');
const Book = require('../src/book');

describe('Book update suit:', () => {
  let book;

  beforeEach((done) => {
    book = new Book({ name: 'Idiot' });
    book.save()
      .then(() => done());
  });

  const assertName = (operation, done) => {
    operation
      .then(() => Book.find())
      .then((books) => {
        assert(books.length === 1);
        assert(books[0].name === 'Bible');
        done();
      });
  };

  it('Should update by set and save', (done) => {
    book.set('name', 'Bible');
    assertName(book.save(), done);
  });
});
