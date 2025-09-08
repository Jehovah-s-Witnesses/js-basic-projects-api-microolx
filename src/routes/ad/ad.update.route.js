import { adService } from '../../services/ad.service.js';

export const adUpdateRoute = async (request, reply) => {
  const {
    params: { ad_id },
    body: { title, description, price, currency, location, status },
    userId,
  } = request;

  const updatedAd = await adService.updateAd(
    ad_id,
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
