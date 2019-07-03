import { CRUD } from '@yapo/ts-crud';
import Service, { IProfileService } from '@ts-services/profile';
import { Commit } from '@/store/types';

export interface Profile {
  getUserData(): Promise<Commit<any>>;
}

export default class ProfileService implements Profile {
  private service: IProfileService;
  constructor(rest: CRUD) {
    // console.log('profile', ProfileService);
    this.service = new Service(rest);
  }

  public async getUserData(): Promise<Commit<any>> {
    try {
      const result = await this.service.get();
      return { type: 'UPDATE_USER_DATA', payload: result.response};
    } catch (error) {
      throw error;
    }
  }
}
