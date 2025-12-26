import { faker, fakerDE } from '@faker-js/faker';
import { connectToMongoose } from '../src/initializers/connectToMongoose';
import mongoose from 'mongoose';
import { User } from '../src/db/User';
import { Ad } from '../src/db/Ad';

console.log('Start seeds');
connectToMongoose('mongodb://root:example@localhost:5001/')
  .then(async () => {
    for (let userIndex = 0; userIndex < 20; userIndex += 1) {
      const user = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      await user.save();

      for (let adIndex = 0; adIndex < 50; adIndex += 1) {
        const ad = new Ad({
          status: 'Public',
          title: fakerDE.commerce.productName(),
          description: fakerDE.commerce.productDescription(),
          price: fakerDE.commerce.price(),
          currency: 'USD',
          location: fakerDE.location.city(),
          userId: user._id,
        });

        await ad.save();
      }
    }
  })
  .then(() => {
    return mongoose.disconnect();
  });
