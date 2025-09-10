import { adService } from '../../services/ad.service';
import { RouteHandler } from 'fastify';

export const adUpdateRoute: RouteHandler<{
  Params: { adId: string };
  Body: {
    title: string;
    description: string;
    price: number;
    currency: string;
    location: string;
    status: string;
  };
}> = async (request, reply) => {
  const {
    params: { adId },
    body: { title, description, price, currency, location, status },
    userId,
  } = request;

  const updatedAd = await adService.updateAd(
    adId,
    title,
    description,
    price,
    currency,
    location,
    status,
    userId,
  );
  reply
    .status(201)
    .send({ message: 'Ad was successful updated', ...updatedAd });
};
