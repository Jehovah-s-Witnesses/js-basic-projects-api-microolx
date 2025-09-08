import { adService } from '../../services/ad.service.js';

export const adRoute = async (request, reply) => {
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
