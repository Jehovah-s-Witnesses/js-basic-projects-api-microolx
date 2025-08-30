import { userService } from '../services/user.service.js';

export const userLoginRoute = async (request, reply) => {
  const { username, password } = request.body;

  try {
    const tokens = await userService.loginUser(username, password);

    reply.status(201).send({ message: 'User success login', ...tokens });
  } catch (err) {
    reply.status(400).send({ message: err.message });
  }
};
