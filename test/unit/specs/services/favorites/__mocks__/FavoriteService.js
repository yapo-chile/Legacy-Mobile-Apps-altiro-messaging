/* eslint-disable no-console, class-methods-use-this */
import polling from '@/store/modules/favorites/utils/polling';

export default class FavoriteService {
  constructor() {
    this.polling = polling;
  }

  isFavorite(ID) {
    return new Promise((resolve, reject) => {
      if (ID && (ID === 1 || ID === '666666')) {
        return resolve({ event: 'ADVIEW_SELECTED_UPDATED', payload: true });
      } else if (ID === 'ERROR:1') {
        return reject(new Error('Favorite not found'));
      } else if (ID === 'ERROR:2') {
        return reject(new Error('id Invalid'));
      }
      return reject(new Error('No ID provided'));
    });
  }

  syncFavorites(USERID) {
    return new Promise((resolve, reject) => {
      if (USERID) {
        return resolve({ event: 'FAVORITES_UPDATED', payload: {} });
      }

      return reject(new Error('No USERID Provided'));
    });
  }

  addFavorite(fav) {
    return new Promise((resolve, reject) => {
      if (fav) {
        return resolve({ event: 'FAVORITES_UPDATED', payload: {} });
      }
      return reject(new Error('No favorite to add'));
    });
  }

  removeFavorite(fav) {
    return new Promise((resolve, reject) => {
      if (fav) {
        return resolve({ event: 'FAVORITES_UPDATED', payload: {} });
      }

      return reject(new Error('No favorite to delete'));
    });
  }
}
