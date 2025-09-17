import { model, Schema, Types } from 'mongoose';
import { Ad } from './Ad';

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
    type: Ad,
    ref: 'Ad',
    required: true,
  },
});

export const Favorite = model('Favorite', favoriteSchema);
