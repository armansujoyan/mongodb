const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
  },
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
