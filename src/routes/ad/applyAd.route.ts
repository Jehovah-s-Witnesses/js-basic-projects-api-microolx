import { adService } from '../../services/ad.service';
import { RouteHandler } from 'fastify';

export const applyAdRoute: RouteHandler<{ Params: { adId: string } }> = async (
  request,
  reply,
) => {
  const {
    params: { adId },
    userId,
  } = request;

  try {
    await adService.applyAd(adId, userId);

    reply.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      reply.status(400).send({ message: err.message });
    }
    reply.status(400).send({ message: 'Internal server error' });
  }
};
