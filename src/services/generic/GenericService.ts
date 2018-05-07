import {CRUD} from '@/ds/CRUD';
import StorageDS from '@/ds/storage/index';

export default class GenericService {
  private ls: CRUD;

  constructor() {
    this.ls = new StorageDS('LocalStorage');
  }

  public async save(item: any): Promise<any> {
    await this.ls.$create('generic', item);
    const value = await this.ls.$read('generic');
    return {event: 'TEXT_UPDATED', payload: value};
  }

  public async get(): Promise<any> {
    const value = await this.ls.$read('generic');
    return {event: 'TEXT_UPDATED', payload: value};
  }
  public async check(): Promise<any> {
    const value = await this.ls.$read('generic');
    const isSet = value !== null;
    return {event: 'CHECK_STORE', payload: isSet};
  }
}
