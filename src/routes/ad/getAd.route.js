import { adService } from '../../services/ad.service.js';

export const getAdRoute = async (request, reply) => {
  const {
    userId,
    query: { limit, offset, status, titleQuery },
  } = request;

  const ads = await adService.getAds(userId, limit, offset, status, titleQuery);

  reply.send(ads);
};
