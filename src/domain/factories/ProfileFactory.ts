import { CRUD, RestDS } from '@Yapo/ts-crud';
import ProfileService, { IProfileService } from '@ts-services/profile';

export { IProfileService };

export class ProfileFactory {
  public static createService(): IProfileService {
    const contentType = { 'Content-Type': 'application/json' };
    const appHeaders = {
      'x-app': 'web-app::messaging-center',
    };
    const base = document.location.href;
    const rest: CRUD = new RestDS(base, {
      ...contentType,
      ...appHeaders,
    });
    // console.log('profile', ProfileService);
    const service = new ProfileService(rest);
    return service;
  }
}
