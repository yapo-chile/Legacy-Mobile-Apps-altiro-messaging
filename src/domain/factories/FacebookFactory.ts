import { CRUD, StorageDS } from '@Yapo/ts-crud';
import FacebookDataService, { FacebookInterface } from '@/domain/services/FacebookDataService';

export class FacebookFactory {
  public static createService(): FacebookInterface {
    const cookieStorage = new StorageDS('CookieStorage');
    return new FacebookDataService(cookieStorage);
  }
}
