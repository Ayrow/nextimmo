import { Schema, model, models, Types, Document, Model } from 'mongoose';

export interface IUserDocument extends Document {
  username: string;
  email: string;
  firebaseUID: string;
  saved: [string];
  alreadySeen: [string];
  role: string;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseUID: {
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
    alreadySeen: [
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
  },
  { timestamps: true }
);

const User: Model<IUserDocument> =
  models.User || model<IUserDocument>('User', userSchema);

export default User;
