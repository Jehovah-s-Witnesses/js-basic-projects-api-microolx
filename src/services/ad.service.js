import { Ad } from '../db/Ad.js';

export const adService = {
  async getAds(userId, limit, offset, status, titleQuery) {
    const filterQuery = { userId };

    if (status) {
      filterQuery.status = status;
    }

    if (titleQuery) {
      filterQuery.title = new RegExp(titleQuery, 'i');
    }

    const count = await Ad.countDocuments(filterQuery);

    const ads = await Ad.find(filterQuery).limit(limit).skip(offset);

    return { items: ads, count };
  },
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
