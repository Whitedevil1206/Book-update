import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  reviews: [{ type: String }],
  isbn: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  _id: Schema.Types.ObjectId,
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
