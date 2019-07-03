import { CRUD, StorageDS } from '@yapo/ts-crud';
import { Commit } from '@/store/types';

export interface AuthInterface {
  isSetUserData(): Promise<Commit<boolean>>;

  getUserData(): Promise<Commit<any>>;

  logoutUser(): Promise<Commit<void>>;
}

export default class StorageAuthService implements AuthInterface {

  private ws!: CRUD;
  private readonly localStorage: CRUD;
  private readonly sessionStorage: CRUD;
  private readonly cookieStorage: CRUD;

  constructor() {
    this.localStorage = new StorageDS('LocalStorage');
    this.sessionStorage = new StorageDS('SessionStorage');
    this.cookieStorage = new StorageDS('CookieStorage');
  }

  public async isSetUserData(): Promise<Commit<boolean>> {
    try {
      this.ws = await this.selectStorage();
      return { type: 'IS_LOGGED_IN', payload: true};
    } catch (error) {
      return { type: 'IS_LOGGED_IN', payload: false};
    }
  }

  public async getUserData(): Promise<Commit<any>> {
    try {
      this.ws = await this.selectStorage();
      const result = await this.ws.$read('accountData');
      return { type: 'UPDATE_USER_SESSION', payload: result};
    } catch (error) {
      throw error;
    }
  }

  public async logoutUser(): Promise<Commit<void>> {
    try {
      if (await this.keyExist(this.localStorage, 'accountData')) {
        await this.localStorage.$delete('accountData', {});
      }
      if (await this.keyExist(this.sessionStorage, 'accountData')) {
        await this.sessionStorage.$delete('accountData', {});
      }
      if (await this.keyExist(this.cookieStorage, 'accountData')) {
        await this.cookieStorage.$delete('accountData', {});
      }
      return { type: 'DELETE_USER_DATA'};
    } catch (error) {
      throw error;
    }
  }

  private async selectStorage(): Promise<CRUD> {
    try {
      return await this.checkStorageAvailability(this.localStorage, this.sessionStorage, this.cookieStorage);
    } catch (error) {
      throw {error, type: 'selectStorage'};
    }
  }

  private async keyExist(DS: CRUD, key: string): Promise<any> {
    try {
      return await DS.$read(key);
    } catch (error) {
      return null;
    }
  }

  private async checkStorageAvailability(ls: CRUD, ss: CRUD, cs: CRUD): Promise<CRUD> {
    try {
      const lsData = await this.keyExist(ls, 'accountData');
      const ssData = await this.keyExist(ss, 'accountData');
      const csData = await this.keyExist(cs, 'accountData');

      if (lsData && this.checkDataProperties(lsData)) {
        return ls;
      } else if (ssData && this.checkDataProperties(ssData)) {
        return ss;
      } else if (csData && this.checkDataProperties(csData)) {
        return cs;
      } else {
        throw new Error('Webstorage is not set');
      }
    } catch (error) {
      throw {error, type: 'checkStorageAvailability'};
    }
  }

  private checkDataProperties(inputObject: any): boolean {
    try {
      if (inputObject !== null) {
        return inputObject.email.trim().length !== 0 &&
          inputObject.name.trim().length !== 0 &&
          inputObject.url.trim().length !== 0 &&
          inputObject.service_url.trim().length !== 0;
      }
      return false;
    } catch (error) {
      throw {error, type: 'checkDataProperties'};
    }
  }
}
