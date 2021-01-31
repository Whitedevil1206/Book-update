import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subscriberSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  _id: Schema.Types.ObjectId,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
