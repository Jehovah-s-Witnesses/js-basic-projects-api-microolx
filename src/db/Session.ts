import { model, Schema, Types } from 'mongoose';

const sessionSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: () => {
      return new Types.ObjectId();
    },
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Session = model('Session', sessionSchema);
