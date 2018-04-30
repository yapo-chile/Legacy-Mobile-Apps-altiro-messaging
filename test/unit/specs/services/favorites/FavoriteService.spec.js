/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import FavoriteService from '@nomock/services/favorites/FavoriteService';
import StorageDS from '@/ds/storage';
import 'jest-localstorage-mock';

const adFirst = {
  adType: '0',
  addedTime: '1519966395122',
  category: '2020',
  currency: 'peso',
  dateTime: '1519955337.33051',
  image: '6666538578.jpg',
  listId: '12345',
  price: '$ 5.150.000',
  priceUF: '$ 0',
  region: '15',
  title: 'Hyundai Accent 2011 ultrafull',
};
const adSecond = {
  adType: '0',
  addedTime: '1519966349655',
  category: '4020',
  currency: 'peso',
  dateTime: '1520037111.05481',
  image: '9161043969.jpg',
  listId: '123456',
  price: '$ 15.000',
  priceUF: '$ 0',
  region: '15',
  title: 'Docena de sostenes NUEVOS',
};
const resultExpect = {
  event: 'FAVORITES_UPDATED',
  payload: [adFirst, adSecond],
};
const resultExpectRemove = {
  event: 'FAVORITES_UPDATED',
  payload: [adFirst],
};

const resultExpectCloseBadge = {
  event: 'CLOSE_BADGE',
  payload: [{ id: 'mySession', show: false }],
};
const resultExpectCheckBadge = {
  event: 'SHOW_BADGE_UPDATED',
  payload: [{ id: 'mySession', show: true }],
};
const resultExpectCheckBadgeAdded = {
  event: 'SHOW_BADGE_UPDATED',
  payload: [{ id: '343434', show: true }, { id: 'mySession', show: true }],
};

const localStorage = new StorageDS('LocalStorage');

describe('FavoriteService test', () => {
  const accSession = 'mySession';
  const baseUrl = 'http://localhost:3000/favorites';
  const favoriteService = new FavoriteService(accSession, baseUrl);
  it('Should throw a error with "Favorite not found" result', async () => {
    expect.assertions(1);
    try {
      await favoriteService.isFavorite(1);
    } catch (error) {
      expect(error.message).toEqual('Favorite not found');
    }
  });
  it('Should throw a error with "Favorite not found" result', async () => {
    expect.assertions(1);
    try {
      const result = await favoriteService.isFavorite(123456);
      expect(result).toEqual({ event: 'ADVIEW_SELECTED_UPDATED', payload: true });
    } catch (error) {
      console.error(error);
    }
  });
  it('Should throw a error with "User ID not set" result', async () => {
    expect.assertions(1);
    try {
      await favoriteService.isFavorite();
    } catch (error) {
      expect(error.message).toEqual('User ID not set');
    }
  });

  it('When call syncFavorites return my last favorites', async () => {
    expect.assertions(1);
    try {
      const favs = await favoriteService.syncFavorites(1, true);
      expect(favs).toEqual(resultExpect);
    } catch (error) {
      console.error(error);
    }
  });

  it('When call syncFavorites without user thrown error user id', async () => {
    expect.assertions(1);
    try {
      await favoriteService.syncFavorites();
    } catch (error) {
      expect(error.message).toEqual('User ID not set');
    }
  });

  it('Handle function to get favorites', async () => {
    expect.assertions(1);
    try {
      const favs = await favoriteService.getFavorites();
      expect(favs).toEqual(resultExpect.payload);
    } catch (error) {
      console.error(error);
    }
  });
  it('Handle function to add favorites', async () => {
    expect.assertions(1);
    try {
      const favorite = { listId: 1000 };
      const result = await favoriteService.addFavorite(favorite);
      expect(result).toEqual(resultExpect);
    } catch (error) {
      console.error(error);
    }
  });
  it('Handle function to remove favorite', async () => {
    expect.assertions(1);
    try {
      const result = await favoriteService.removeFavorite(123456);
      expect(result).toEqual(resultExpectRemove);
    } catch (error) {
      console.error(error);
    }
  });
  it('Handle function to check accSession', async () => {
    expect.assertions(1);
    try {
      const result = await favoriteService.checkAccSession();
      expect(result).toEqual(true);
    } catch (error) {
      console.error(error);
    }
  });
  it('close badge', async () => {
    expect.assertions(1);
    await localStorage.$delete('usersBadge');
    await localStorage.$create('usersBadge', [{ id: 'mySession', show: true }]);
    try {
      const result = await favoriteService.closeBadge();
      expect(result).toEqual(resultExpectCloseBadge);
      await localStorage.$delete('usersBadge');
    } catch (error) {
      console.error(error);
    }
  });
  it('throw error if badge not exist on close', async () => {
    expect.assertions(1);
    await localStorage.$delete('usersBadge');
    await localStorage.$create('usersBadge', [{ id: '455445', show: true }]);
    try {
      await favoriteService.closeBadge();
    } catch (error) {
      expect(error.message).toEqual('Cannot set property \'show\' of undefined');
    }
  });

  it('if badge not exist is created', async () => {
    expect.assertions(1);
    await localStorage.$delete('usersBadge');
    try {
      const result = await favoriteService.checkBadge();
      expect(result).toEqual(resultExpectCheckBadge);
    } catch (error) {
      console.error(error);
    }
  });
  it('find badge and return the badget array', async () => {
    expect.assertions(1);
    await localStorage.$delete('usersBadge');
    await localStorage.$create('usersBadge', [{ id: 'mySession', show: true }]);
    try {
      const result = await favoriteService.checkBadge();
      expect(result).toEqual(resultExpectCheckBadge);
    } catch (error) {
      console.error(error);
    }
  });
  it('find the user and if no exits, add a object to badget array', async () => {
    expect.assertions(1);
    await localStorage.$delete('usersBadge');
    await localStorage.$create('usersBadge', [{ id: '343434', show: true }]);
    try {
      const result = await favoriteService.checkBadge();
      expect(result).toEqual(resultExpectCheckBadgeAdded);
    } catch (error) {
      console.error(error);
    }
  });
});
