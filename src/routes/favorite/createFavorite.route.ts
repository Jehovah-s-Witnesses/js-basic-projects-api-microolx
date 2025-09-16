import { RouteHandler } from 'fastify';
import { favoriteService } from '../../services/favorite.service';

export const createFavoriteRoute: RouteHandler<{
  Body: { adId: string };
}> = async (request, reply) => {
  const {
    body: { adId },
    userId,
  } = request;

  try {
    await favoriteService.addFavorite(adId, userId);
  } catch (err) {
    if (err instanceof Error) {
      reply.status(400).send({ message: err.message });
    }

    reply.status(400).send({ message: 'Internal server error' });
  }
};
