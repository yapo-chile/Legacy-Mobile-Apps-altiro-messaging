import { CRUD } from '@Yapo/ts-crud';
import { Commit } from '@/store/types';

export interface FacebookInterface {
  getImage(): Promise<Commit<string>>;

  getId(): Promise<Commit<string | null>>;
}

export default class FacebookDataService implements FacebookInterface {

  private readonly cookieStorage: CRUD;

  constructor(cookieStorage: CRUD) {
    this.cookieStorage = cookieStorage;
  }

  public async getImage(): Promise<Commit<string>> {
    try {
      const commit = await this.getId();
      const image = this.formatImage(commit.payload);
      return { type: 'UPDATE_IMAGE', payload: image};
    } catch (error) {
      return { type: 'UPDATE_IMAGE', payload: ''};
    }
  }

  public async getId(): Promise<Commit<string | null>> {
    try {
      const id = await this.cookieStorage.$read('c_user');
      return { type: 'UPDATE_ID', payload: id};
    } catch (error) {
      return { type: 'UPDATE_ID', payload: null};
    }
  }

  private formatImage(id: string | null | undefined) {
    if (id !== null) {
      return `http://graph.facebook.com/${id}/picture?type=square`;
    }
    return '';
  }
}
