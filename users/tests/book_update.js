const assert = require('assert');
const Book = require('../src/book');

describe('Book update suit:', () => {
  let book;

  beforeEach((done) => {
    book = new Book({ name: 'Idiot', rating: 1, pages: 220 });
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

  it('Should update by update() method', (done) => {
    assertName(book.update({ name: 'Bible' }), done);
  });

  it('Should update by update of class', (done) => {
    assertName(Book.update({ name: 'Idiot' }, { name: 'Bible' }), done);
  });

  it('Should update by findOneAndUpdate of class', (done) => {
    assertName(Book.findOneAndUpdate({ name: 'Idiot' }, { name: 'Bible' }), done);
  });

  it('Should update by findByIdAndUpdate of class', (done) => {
    assertName(Book.findByIdAndUpdate(book._id, { name: 'Bible' }), done);
  });

  it('Should increment rating by one', (done) => {
    Book.findByIdAndUpdate(book._id, { $inc: { rating: 1 } })
      .then(() => Book.findById(book._id))
      .then((foundBook) => {
        assert(foundBook.rating === 2);
        done();
      });
  });
});
