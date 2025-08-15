import { connectToMongoose } from '../src/initializers/connectToMongoose.js';
import { MONGO_URI } from '../src/constants/db.js';
import mongoose from 'mongoose';

export const setup = async () => {
  await connectToMongoose(MONGO_URI);
  console.log('Test mongo connected');
};

export const teardown = async () => {
  await mongoose.disconnect();
  console.log('Test mongo disconnected');
};
