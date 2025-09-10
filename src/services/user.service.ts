import { User } from '../db/User';
import { compare, hash } from 'bcrypt';
import { sessionService } from './session.service';

export const userService = {
  async createUser(email: string, username: string, password: string) {
    const user = new User({
      email,
      username,
      password: await hash(password, 10),
    });

    await user.save();

    return user;
  },
  findUserByEmail(email: string) {
    return User.findOne({ email });
  },
  findUserByUsername(username: string) {
    return User.findOne({ username });
  },
  async loginUser(username: string, password: string) {
    const currentUser = await this.findUserByUsername(username);

    if (!currentUser) {
      throw new Error('user does not exist');
    }

    const isCorrectPassword = await compare(password, currentUser.password);

    if (!isCorrectPassword) {
      throw new Error('Password is not correct!');
    }

    return sessionService.generateTokens(currentUser._id.toString());
  },
};
