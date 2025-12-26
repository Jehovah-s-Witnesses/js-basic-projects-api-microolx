import { Ad } from '../db/Ad';

export const adService = {
  async getAds(
    userId: string,
    limit: number,
    offset: number,
    status?: string,
    titleQuery?: RegExp,
  ) {
    interface QueryFilter {
      userId: string;
      status?: string;
      title?: RegExp;
    }

    const filterQuery: QueryFilter = { userId };

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
  async getPublishAds(
    userId: string,
    limit: number,
    offset: number,
    titleQuery: RegExp,
  ) {
    interface QueryFilter {
      userId: { $ne: string };
      title?: RegExp;
    }

    const filterQuery: QueryFilter = { userId: { $ne: userId } };

    if (titleQuery) {
      filterQuery.title = new RegExp(titleQuery, 'i');
    }

    const count = await Ad.countDocuments(filterQuery);

    const ads = await Ad.find(filterQuery).limit(limit).skip(offset);

    return { items: ads, count };
  },
  async createAd(
    title: string,
    description: string,
    price: number,
    currency: string,
    location: string,
    status: string,
    userId: string,
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
    adId: string,
    title: string,
    description: string,
    price: number,
    currency: string,
    location: string,
    status: string,
    userId: string,
  ) {
    if (!(await this.findAd(adId, userId))) {
      throw new Error('This ad is does not exist');
    }

    await Ad.updateOne(
      { _id: adId, userId },
      { title, description, price, currency, location, status },
    );
    const updatedAd = await Ad.findOne({ _id: adId, userId }).lean();

    console.log(updatedAd);

    return updatedAd;
  },
  async findAd(adId: string, userId?: string) {
    type Filter = {
      _id: string;
      userId?: string;
    };
    const filter: Filter = { _id: adId };

    if (userId) {
      filter.userId = userId;
    }

    return Ad.findOne(filter);
  },

  async applyAd(adId: string, userId: string) {
    const ad = await this.findAd(adId);

    if (!ad) {
      throw new Error('This ad does not exist');
    }

    if (ad.userId.toString() === userId) {
      throw new Error('You can`t apply your own ad');
    }

    if (ad.status !== 'Public') {
      throw new Error(' This ad status not public');
    }

    await Ad.updateOne(
      { _id: adId },
      { applierId: userId, status: 'Archived' },
    );
  },
};
