import { Ad } from '../db/Ad.js';

export const adService = {
  async createAd(
    title,
    description,
    price,
    currency,
    location,
    status,
    userId,
  ) {
    const ad = new Ad({
      title,
      description,
      price,
      currency,
      location,
      status,
      userId,
    });

    await ad.save();

    return ad;
  },
  async updateAd(
    adId,
    title,
    description,
    price,
    currency,
    location,
    status,
    userId,
  ) {
    if (!(await this.findAd(adId, userId))) {
      throw new Error('This ad is does not exist');
    }

    await Ad.updateOne(
      { _id: adId, userId },
      { title, description, price, currency, location, status },
    );
  },
  async findAd(adId, userId) {
    return Ad.findOne({ _id: adId, userId }).lean();
  },
};
