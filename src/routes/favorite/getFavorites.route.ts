import { RouteHandler } from 'fastify';
import { favoriteService } from '../../services/favorite.service';

export const getFavoritesRoute: RouteHandler<{
  Querystring: { limit: number; offset: number };
}> = async (request, reply) => {
  const {
    query: { limit, offset },
    userId,
  } = request;

  const favorites = await favoriteService.getFavorites(userId, limit, offset);

  reply.send(favorites);
};
