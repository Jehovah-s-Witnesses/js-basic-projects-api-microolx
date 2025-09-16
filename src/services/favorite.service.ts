import { adService } from './ad.service';
import { Favorite } from '../db/Favorite';

export const favoriteService = {
  async addFavorite(adId: string, userId: string) {
    const currentAd = await adService.findAd(adId);

    if (!currentAd) {
      throw new Error('This ad does not exist!');
    }

    const currentFavorite = await Favorite.findOne({ userId, adId });

    if (currentFavorite) {
      throw new Error('This ad was already added to favorites');
    }

    if (currentAd.userId.toString() === userId) {
      throw new Error('You can not add your own ads to favorite!');
    }

    if (currentAd.status !== 'Public') {
      throw new Error('Status this ad not public!');
    }

    const favoriteAd = new Favorite({
      userId,
      adId,
    });

    await favoriteAd.save();
  },

  async removeFavorite(favoriteId: string, userId: string) {
    const filter = { _id: favoriteId, userId };
    const currentFavorite = await Favorite.findOne(filter);

    if (!currentFavorite) {
      throw new Error('This favorite does not exist');
    }

    await currentFavorite.deleteOne(filter);
  },
};
