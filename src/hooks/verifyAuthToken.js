import { sessionService } from '../services/session.service.js';

export const verifyAuthToken = async (request, reply) => {
  const { authorization } = request.headers;

  try {
    const { userId } = await sessionService.verifyToken(authorization);
    request.id = userId;
  } catch (err) {
    reply.status(401).send({ message: 'Token is invalid!' });
  }
};
