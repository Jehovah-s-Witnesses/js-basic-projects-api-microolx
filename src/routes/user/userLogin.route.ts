import { userService } from '../../services/user.service';
import { RouteHandler } from 'fastify';

export const userLoginRoute: RouteHandler<{
  Body: { username: string; password: string };
}> = async (request, reply) => {
  const { username, password } = request.body;

  try {
    const tokens = await userService.loginUser(username, password);

    reply.status(201).send({ message: 'user success login', ...tokens });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    reply.status(400).send({ message: 'Server error' });
  }
};
