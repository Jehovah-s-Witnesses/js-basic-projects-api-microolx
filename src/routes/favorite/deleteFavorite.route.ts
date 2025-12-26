import { RouteHandler } from 'fastify';
import { favoriteService } from '../../services/favorite.service';

export const deleteFavoriteRoute: RouteHandler<{
  Params: { favoriteId: string };
}> = async (request, reply) => {
  const {
    params: { favoriteId },
    userId,
  } = request;

  try {
    await favoriteService.removeFavorite(favoriteId, userId);
  } catch (err) {
    if (err instanceof Error) {
      reply.status(400).send({ message: err.message });
    }

    reply.status(400).send({ message: 'Internal server error' });
  }
};
