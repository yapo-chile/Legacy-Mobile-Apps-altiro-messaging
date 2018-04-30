/* eslint-disable no-console */
import StorageDS from '@/ds/storage';
import 'jest-localstorage-mock';

const typeStorage = 'LocalStorage';
describe('LocalStorageDS test suite', () => {
  it('Should create new item and read it in localStorage', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      const testObject = { string: 'data' };
      await ls.$create('test', testObject);

      const persistedObject = await ls.$read('test');
      expect(persistedObject).toEqual(testObject);
    } catch (error) {
      console.error(error);
    }
  });

  it('$read should return null if an item doesnt exists', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      const persistedObject = await ls.$read('not exist');
      expect(persistedObject).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });

  it('$read should fail if the key is not provided', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      // eslint-disable-next-line no-unused-vars
      throw await ls.$read();
    } catch (error) {
      expect(error.message).toEqual('Storage.$storage: Missing parameter key');
    }
  });

  it('$read should fail if the key is not provided', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      // eslint-disable-next-line no-unused-vars
      throw await ls.$read();
    } catch (error) {
      expect(error.message).toEqual('Storage.$storage: Missing parameter key');
    }
  });

  it('$update should update an existent key', async () => {
    expect.assertions(2);
    try {
      const ls = new StorageDS(typeStorage);
      const itemToUpdate = { name: 'TEST' };
      // eslint-disable-next-line no-unused-vars
      await ls.$create('itemToUpdate', itemToUpdate);
      expect(await ls.$read('itemToUpdate')).toEqual(itemToUpdate);

      const updatedItem = { name: 'TESTABLE' };
      await ls.$update('itemToUpdate', updatedItem);
      expect(await ls.$read('itemToUpdate')).toEqual(updatedItem);
    } catch (error) {
      console.error(error);
    }
  });

  it('$update should fail if the key doesnt exists', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);

      const errorObject = { name: 'ERROR' };
      throw await ls.$update('errorObject', errorObject);
    } catch (error) {
      expect(error.message).toEqual('LOCALSTORAGEDS: Cant update item because the key doesnt exists.');
    }
  });

  it('$delete should delete an existent item', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      const itemToUpdate = { name: 'TEST' };
      // eslint-disable-next-line no-unused-vars
      await ls.$create('itemToUpdate', itemToUpdate);
      await ls.$delete('itemToUpdate');
      const deletedData = await ls.$read('itemToUpdate');
      expect(deletedData).toBeNull();
    } catch (error) {
      console.log(error);
    }
  });

  it('$delete should fail at delete a void item', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      throw await ls.$delete('itemToUpdate');
    } catch (error) {
      expect(error.message).toEqual('LOCALSTORAGEDS: Cant delete item because the key doesnt exists.');
    }
  });

  it('$clear should erase all the stored items', async () => {
    expect.assertions(2);
    try {
      const ls = new StorageDS(typeStorage);
      await ls.$clear();
      await ls.$create('item1', { a: 1 });
      await ls.$create('item2', { a: 1 });
      await ls.$create('item3', { a: 1 });

      let length = await ls.$length();
      expect(length).toEqual(3);

      await ls.$clear();
      length = await ls.$length();
      expect(length).toEqual(0);
    } catch (error) {
      console.error(error);
    }
  });

  it('$key should get name of a key given the position', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);
      await ls.$clear();
      await ls.$create('item1', { a: 1 });

      const key = await ls.$storage('key', 0);

      expect(key).toEqual('item1');
    } catch (error) {
      console.error(error);
    }
  });

  it('no method given should return null', async () => {
    expect.assertions(1);
    try {
      const ls = new StorageDS(typeStorage);

      const key = await ls.$storage();

      expect(key).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });
});
