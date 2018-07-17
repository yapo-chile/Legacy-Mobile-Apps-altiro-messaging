import {StorageDS} from '@Yapo/ts-crud';
import GenericService, {GenericInterface} from '@/domain/services/GenericService';

export class GenericFactory {

    public static createService(): GenericInterface {
        const storage = new StorageDS('LocalStorage');
        return new GenericService(storage);
    }
}
