const assert = require('assert');
const Book = require('../src/book');

describe('Book validation tests', () => {
  it('The name should be required', () => {
    const book = new Book({ name: undefined });
    const validationData = book.validateSync();
    const { message } = validationData.errors.name;
    assert(message === 'Book name is required');
  });
});
