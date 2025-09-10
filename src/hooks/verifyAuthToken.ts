import { sessionService } from '../services/session.service';
import type { RouteHandler } from 'fastify';

export const verifyAuthToken: RouteHandler<{
  Headers: { authorization: string };
}> = async (request, reply) => {
  const { authorization } = request.headers;

  try {
    const { userId } = await sessionService.verifyToken(authorization);
    request.userId = userId;
  } catch (err) {
    reply.status(401).send({ message: 'Token is invalid!' });
  }
};
