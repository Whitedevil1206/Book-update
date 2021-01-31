import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: Schema.Types.Mixed,
    required: true,
  },
  _id: Schema.Types.ObjectId,
  subscribed: { type: Schema.Types.ObjectId, ref: 'Subscriber' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', userSchema);

export default User;
