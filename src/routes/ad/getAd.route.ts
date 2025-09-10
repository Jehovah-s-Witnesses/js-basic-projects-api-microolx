import { adService } from '../../services/ad.service';
import { RouteHandler } from 'fastify';

export const getAdRoute: RouteHandler<{
  Querystring: {
    limit: number;
    offset: number;
    status: string;
    titleQuery: string;
  };
}> = async (request, reply) => {
  const {
    userId,
    query: { limit, offset, status, titleQuery },
  } = request;

  const ads = await adService.getAds(userId, limit, offset, status, titleQuery);

  reply.send(ads);
};
