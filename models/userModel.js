import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  saved: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Listing',
    },
  ],
});

const User = models.User || model('User', userSchema);

export default User;
