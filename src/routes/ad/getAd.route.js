import { adService } from '../../services/ad.service.js';

export const getAdRoute = async (request, reply) => {
  const {
    userId,
    query: { limit, offset, status },
  } = request;

  const ads = await adService.getAds(userId, limit, offset, status);

  reply.send(ads);
};
