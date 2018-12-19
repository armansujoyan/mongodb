const assert = require('assert');
const Book = require('../src/book');

describe('Book validation tests', () => {
  it('The name should be required', () => {
    const book = new Book({ name: undefined });
    const validationData = book.validateSync();
    const { message } = validationData.errors.name;
    assert(message === 'Book name is required');
  });

  it('The rating sould be in the range (1,5)', () => {
    const book = new Book({ rating: 6 });
    const validationData = book.validateSync();
    const { message } = validationData.errors.rating;
    assert(message === 'Rating must be between 1 and 5');
  });

  it('Should reject to update book with false validation', (done) => {
    const book = new Book({ name: 'Bible', rating: 8 });
    book.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.rating;
        assert(message === 'Rating must be between 1 and 5');
        done();
      });
  });

  it('The page count sould be required', () => {
    const book = new Book({ pages: undefined });
    const validationData = book.validateSync();
    const { message } = validationData.errors.pages;
    assert(message === 'Page count is required');
  });
});
