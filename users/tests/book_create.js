const assert = require('assert');
const Book = require('../src/book');

describe('Book model tests.', () => {
  it('Book has to be saved.', (done) => {
    const book = new Book({ name: 'Mechanics', pages: 550 });
    book.save()
      .then(() => {
        assert(book.isNew === false);
        done();
      });
  });
});
