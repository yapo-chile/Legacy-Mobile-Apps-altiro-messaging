import {CRUD} from '@/ds/CRUD';
import LocalStorage from '@/ds/storage/LocalStorage';
import StorageDS from '@/ds/storage';

export class GenericService {
    ls: CRUD;

    constructor() {
        this.ls = new StorageDS('LocalStorage');
    }

    async save(item: any): Promise<any> {
        this.ls.$create('generic', item);
        return await this.ls.$read('generic');
    }

    async get(): Promise<any> {
        return await this.ls.$read('generic');
    }
}