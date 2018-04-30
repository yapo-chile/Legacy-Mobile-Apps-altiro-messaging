/* eslint-disable no-console */
import StorageDS from '@/ds/storage';

describe('Data Services to handle Favorites', () => {
  const storage = new StorageDS('CrossStorage');

  it('Storage not support', async () => {
    expect.assertions(1);
    try {
      /* eslint-disable no-new */
      new StorageDS('NotImplementedStorage');
    } catch (error) {
      expect(error.message).toEqual('Storage: type storage not exist');
    }
  });

  it('handle function for see if is avalaible storage', async () => {
    expect.assertions(1);
    try {
      const items = await storage.checkAvailability();
      expect(items).toEqual(true);
    } catch (error) {
      console.error(error);
    }
  });

  it('handle function setItem', async (done) => {
    expect.assertions(1);
    try {
      const jsonString = [{ id: '1' }];
      const items = await storage.$create('lastFavs', jsonString);
      expect(items).toEqual([{ id: '1' }]);
      done();
    } catch (error) {
      console.error(error);
      done();
    }
  });

  it('handle function getItem', async (done) => {
    expect.assertions(1);
    try {
      const item = await storage.$read('123456');
      expect(item).toBe(true);
    } catch (error) {
      console.error(error);
    }
    done();
  });

  it('handle getItem without key', async (done) => {
    expect.assertions(1);
    try {
      const result = await storage.$read();
      expect(result.message).toEqual('Storage.$storage: Missing parameter key');
    } catch (error) {
      console.log(error);
    }
    done();
  });
});
