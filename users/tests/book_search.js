const assert = require('assert');
const Book = require('../src/book');

describe('Book search', () => {
  let book;

  beforeEach((done) => {
    book = new Book({ name: 'Love' });
    book.save()
      .then(() => done());
  });

  it('Should find all the books', (done) => {
    Book.find({ name: 'Love' })
      .then((books) => {
        assert(books[0]._id.toString() === book._id.toString());
        done();
      });
  });

  it('Should find the first matchng book with name', (done) => {
    Book.findOne({ _id: book._id })
      .then((foundBook) => {
        assert(foundBook.name === 'Love');
        done();
      });
  });
});
