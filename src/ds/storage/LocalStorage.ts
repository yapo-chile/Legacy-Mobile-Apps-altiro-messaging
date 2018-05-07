import DSUtils from '../ds-utils';
import WebStorage from './WebStorage';

/**
 * Class to save to cache info
 * @class LocalStorage
 * @desc A Storage class to save data into localStorage
 */
export default class LocalStorage implements WebStorage {
  private localStorage: Storage;
  constructor() {
    if (this.checkAvailability()) {
      this.localStorage = window.localStorage;
    } else {
      throw new Error('localStorage is not available.');
    }
  }

  public setItem(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    const result = this.localStorage.getItem(key);
    try {
      if (result !== null) {
        return JSON.parse(result);
      }
      return result;
    } catch (error) {
      return result;
    }
  }

  public removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  public key(key: number): string | null {
    return this.localStorage.key(key);
  }

  public length(): number {
    return this.localStorage.length;
  }

  public clear(): void {
    this.localStorage.clear();
  }

  public async checkAvailability() {
    return DSUtils.storageAvailable('localStorage');
  }
}
