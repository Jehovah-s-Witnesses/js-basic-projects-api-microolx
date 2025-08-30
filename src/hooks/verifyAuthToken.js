import { sessionService } from '../services/session.service.js';

export const verifyAuthToken = async (request, reply) => {
  const { accessToken } = request.body;

  try {
    const { userId } = await sessionService.verifyToken(accessToken);
    request.id = userId;
  } catch (err) {
    reply.status(401).send({ message: 'Token is invalid!' });
  }
};
