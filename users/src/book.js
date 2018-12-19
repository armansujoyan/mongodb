const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Book name is required'],
  },
  rating: {
    type: Number,
    validate: rating => rating < 6 && rating > 0,
    message: 'Rating must be between 1 and 5',
  },
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
