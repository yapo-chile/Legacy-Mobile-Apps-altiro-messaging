import { CRUD, RestDS } from '@yapo/ts-crud';
import ProfileService, { Profile } from '../services/ProfileService';

export { Profile };

export class ProfileFactory {
  public static createService(session: string): Profile {
    const contentType = { 'Content-Type': 'application/json' };
    const appHeaders = {
      'x-app': 'web::messaging-center',
    };
    const authHeaders = {
      Authorization: session,
    };
    const base = document!.location!.href;

    // const base = (document as any).location.href as string;
    const rest: CRUD = new RestDS(`${base}/`, {
      ...contentType,
      ...appHeaders,
      ...authHeaders,
    });
    // console.log('profile', ProfileService);
    const service = new ProfileService(rest);
    return service;
  }
}
