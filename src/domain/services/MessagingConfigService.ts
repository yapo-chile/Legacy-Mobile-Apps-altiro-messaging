import { CRUD } from '@Yapo/ts-crud';
import { Commit } from '@/store/types';
import { MessagingConfig } from '@/domain/entities/MessagingEntity';

export interface MessagingConfigInterface {
  save(item: MessagingConfig): Promise<Commit<MessagingConfig>>;

  get(): Promise<Commit<MessagingConfig>>;

  check(): Promise<Commit<boolean>>;
}

export default class MessagingConfigService implements MessagingConfigInterface {
  private ls: CRUD;
  private lsNameStore: string = 'messaging_config';

  constructor(storage: CRUD) {
    this.ls = storage;
  }

  public async save(item: MessagingConfig): Promise<Commit<MessagingConfig>> {
    try {
      await this.ls.$create(this.lsNameStore, item);
      const value = await this.ls.$read(this.lsNameStore);
      return {type: 'CONFIG_UPDATED', payload: value};
    } catch (error) {
      return {type: 'STORE_ERROR', payload: error};
    }
  }

  public async get(): Promise<Commit<MessagingConfig>> {
    try {
      const value = await this.ls.$read(this.lsNameStore);
      return {type: 'CONFIG_UPDATED', payload: value};
    } catch (error) {
      return {type: 'STORE_ERROR', payload: error};
    }
  }

  public async check(): Promise<Commit<boolean>> {
    try {
      const value = await this.ls.$read(this.lsNameStore);
      const isSet = value !== null;
      return {type: 'CHECK_STORE', payload: isSet};
    } catch (error) {
      return {type: 'STORE_ERROR', payload: error};
    }
  }
}
