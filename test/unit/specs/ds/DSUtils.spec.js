import DSUtils from '@/ds/ds-utils';
import 'jest-localstorage-mock';

describe('DSUtils suite', () => {
  it('Should return true if localStorage is available', () => {
    expect.assertions(1);
    const isAvailable = DSUtils.storageAvailable('localStorage');
    expect(isAvailable).toBeTruthy();
  });

  it('Should return true if sessionStorage is available', () => {
    expect.assertions(1);
    const isAvailable = DSUtils.storageAvailable('sessionStorage');
    expect(isAvailable).toBeTruthy();
  });

  it('Should return false if a random String is provided', () => {
    expect.assertions(1);
    const randomString = Math.random().toString(36).substring(7);
    const isAvailable = DSUtils.storageAvailable(randomString);
    expect(isAvailable).toBeFalsy();
  });

  it('Should return false if the storage throws an Exception', () => {
    expect.assertions(1);
    window.mockStorage = {
      storage: [],
      // eslint-disable-next-line no-unused-vars
      setItem: (label, value) => {
        throw new DOMException({ code: 22 });
      },
    };
    const isAvailable = DSUtils.storageAvailable('mockStorage');

    expect(isAvailable).toBeFalsy();
  });

  it('Should return false if the Storage is an Exception and storage === 0', () => {
    expect.assertions(1);
    window.mockStorage = {
      length: 1,
      // eslint-disable-next-line no-unused-vars
      setItem: (label, value) => {
        throw new DOMException({ name: 'QuotaExceededError' });
      },
    };

    const isAvailable = DSUtils.storageAvailable('mockStorage');

    expect(isAvailable).toBeFalsy();
  });

  it('Should evaluate if the object provided is valid Header', () => {
    expect.assertions(2);
    const headers = { 'Content-Type': 'application/json' };
    const isValidHeader = DSUtils.validateHeaders(headers);

    expect(isValidHeader).toBeTruthy();
    try {
      // eslint-disable-next-line no-unused-vars
      const invalidHeader = DSUtils.validateHeaders('hola');
    } catch (error) {
      expect(error.message).toEqual('DSUtils: Invalid headers. hola');
    }
  });

  it('Should evaluate if the object provided is valid Endpoint', () => {
    expect.assertions(2);
    const validEndpoint = 'https://api.yapo.cl';
    const isValidEndpoint = DSUtils.validateEndpoint(validEndpoint);

    expect(isValidEndpoint).toBeTruthy();
    try {
      // eslint-disable-next-line no-unused-vars
      const invalidEndpoint = DSUtils.validateEndpoint(' 123');
    } catch (error) {
      expect(error.message).toEqual('DSUtils: Invalid endpoint 123');
    }
  });

  it('Should evaluate if the object provided is valid Endpoint', () => {
    expect.assertions(3);
    const serializableObject = { commune: '13001', region: '13' };
    const isSerializableObject = DSUtils.serialize(serializableObject);
    expect(isSerializableObject).toEqual('?commune=13001&region=13');

    const queryString = DSUtils.serialize('?commune=13001&region=13');
    expect(queryString).toEqual('?commune=13001&region=13');

    const emptyString = DSUtils.serialize();
    expect(emptyString).toEqual('');
  });
});
