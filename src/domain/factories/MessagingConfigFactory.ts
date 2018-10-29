import { StorageDS } from '@Yapo/ts-crud';
import MessagingConfigService, { MessagingConfigInterface } from '@/domain/services/MessagingConfigService';

export class MessagingConfigFactory {
  public static createService(): MessagingConfigInterface {
    const storage = new StorageDS('LocalStorage');
    return new MessagingConfigService(storage);
  }
}
