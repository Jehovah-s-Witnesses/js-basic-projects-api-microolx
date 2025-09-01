import { userService } from '../../services/user.service.js';

export const userRoute = async (request, reply) => {
  const { username, email, password } = request.body;

  if (
    (await userService.findUserByEmail(email)) ||
    (await userService.findUserByUsername(username))
  ) {
    reply.status(400).send({ message: 'user with this data already exist' });
    return;
  }

  await userService.createUser(email, username, password);

  reply.status(201).send({ message: 'user successfully created' });
};
