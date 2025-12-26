import { adService } from '../../services/ad.service';
import { RouteHandler } from 'fastify';

export const adRoute: RouteHandler<{
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
    userId,
    body: { title, description, price, currency, location, status },
  } = request;

  const ad = await adService.createAd(
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
    .send({ message: 'Ad successful created', ...ad.toObject() });
};
