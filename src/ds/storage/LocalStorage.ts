import WebStorage from "./WebStorage";
import DSUtils from '../ds-utils';

/**
 * Class to save to cache info
 * @class LocalStorage
 * @desc A Storage class to save data into localStorage
 */
export default class LocalStorage implements WebStorage {
  localStorage: Storage;
  constructor() {
    if (this.checkAvailability()) {
      this.localStorage = window.localStorage;
    } else {
      throw 'localStorage is not available.'
    }
  }

  setItem(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  getItem(key: string): any {
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

  removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  key(key: number): string | null {
    return this.localStorage.key(key);
  }

  length(): number {
    return this.localStorage.length;
  }

  clear(): void {
    this.localStorage.clear();
  }

  async checkAvailability() {
    return DSUtils.storageAvailable('localStorage');
  }
}
