import { User } from '../db/User.js';
import { hash } from 'bcrypt';

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
};
