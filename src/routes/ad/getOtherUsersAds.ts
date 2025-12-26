import { RouteHandler } from 'fastify';
import { adService } from '../../services/ad.service';

export const getOtherUsersAds: RouteHandler<{
  Querystring: { limit: number; offset: number; titleQuery: RegExp };
}> = async (request, reply) => {
  const {
    userId,
    query: { limit, offset, titleQuery },
  } = request;

  const ads = await adService.getPublishAds(userId, limit, offset, titleQuery);

  reply.send(ads);
};
