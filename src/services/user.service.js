import { User } from '../db/User.js';
import { compare, hash } from 'bcrypt';
import { sessionService } from './session.service.js';

export const userService = {
  async createUser(email, username, password) {
    const user = new User({
      email,
      username,
      password: await hash(password, 10),
    });

    await user.save();

    return user;
  },
  findUserByEmail(email) {
    return User.findOne({ email });
  },
  findUserByUsername(username) {
    return User.findOne({ username });
  },
  async loginUser(username, password) {
    const currentUser = await this.findUserByUsername(username);

    if (!currentUser) {
      throw new Error('User does not exist');
    }

    const isCorrectPassword = await compare(password, currentUser.password);

    if (!isCorrectPassword) {
      throw new Error('Password is not correct!');
    }

    return sessionService.generateTokens(currentUser._id);
  },
};
