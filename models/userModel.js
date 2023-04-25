import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = models.User || model('User', userSchema);

export default User;
