import { Schema, model, models, Types } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  saved: [
    {
      type: Types.ObjectId,
      ref: 'Listing',
    },
  ],
  role: {
    type: String,
    enum: ['admin', 'agent', 'user'],
    default: 'user',
  },
});

const User = models.User || model('User', userSchema);

export default User;
