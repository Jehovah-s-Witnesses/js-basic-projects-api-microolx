import { Session } from '../db/Session.js';
import { sessionService } from '../services/session.service.js';

export const refreshSessionRoute = async (request, reply) => {
  const { refreshToken } = request.body;

  try {
    const updateTokens = await sessionService.refreshTokens(refreshToken);

    reply
      .status(200)
      .send({ message: 'Session successful update', ...updateTokens });
  } catch (err) {
    reply.status(400).send({ message: err.message });
  }
};
