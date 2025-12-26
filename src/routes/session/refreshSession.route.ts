import { sessionService } from '../../services/session.service';
import { RouteHandler } from 'fastify';

export const refreshSessionRoute: RouteHandler<{
  Body: { refreshToken: string };
}> = async (request, reply) => {
  const { refreshToken } = request.body;

  try {
    const updateTokens = await sessionService.refreshTokens(refreshToken);

    reply
      .status(200)
      .send({ message: 'Session successful update', ...updateTokens });
  } catch (err) {
    if (err instanceof Error) {
      reply.status(400).send({ message: err.message });
    }

    reply.status(400).send({ message: 'Internal server error' });
  }
};
