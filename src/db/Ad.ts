import { model, Schema, Types, InferSchemaType } from 'mongoose';

export const adSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: () => {
      return new Types.ObjectId();
    },
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'UAH'],
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Draft', 'Public', 'Archived'],
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  applierId: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

export type AdDocument = InferSchemaType<typeof adSchema>;

export const Ad = model('Ad', adSchema);
