import { userService } from '../services/user.service.js';

export const userRoute = async (request, reply) => {
  const { username, email, password } = request.body;

  if (
    userService.findUserByEmail(email) ||
    userService.findUserByUsername(username)
  ) {
    reply.status(400).send({ message: 'User with this data already exist' });
    return;
  }

  await userService.createUser(email, username, password);

  reply.status(201).send({ message: 'User successfully created' });
};
