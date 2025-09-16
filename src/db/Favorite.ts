import { model, Schema, Types } from 'mongoose';

export const favoriteSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: () => {
      return new Types.ObjectId();
    },
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adId: {
    type: Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
});

export const Favorite = model('Favorite', favoriteSchema);
