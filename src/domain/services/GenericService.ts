import {CRUD} from '@Yapo/ts-crud';
import {Commit} from '@/store/types';
import {GenericEntity} from '@/domain/entities/GenericEntity';

export interface GenericInterface {
    save(item: any): Promise<Commit<GenericEntity>>;

    get(): Promise<Commit<GenericEntity>>;

    check(): Promise<Commit<boolean>>;
}

export default class GenericService implements GenericInterface {
    private ls: CRUD;

    constructor(storage: CRUD) {
        this.ls = storage;
    }

    public async save(item: { text: string }): Promise<Commit<GenericEntity>> {
        try {
            await this.ls.$create('generic', item);
            const value = await this.ls.$read('generic');
            return {type: 'TEXT_UPDATED', payload: value};
        } catch (error) {
            return {type: 'STORE_ERROR', payload: error};
        }
    }

    public async get(): Promise<Commit<GenericEntity>> {
        try {
            const value = await this.ls.$read('generic');
            return {type: 'TEXT_UPDATED', payload: value};
        } catch (error) {
            return {type: 'STORE_ERROR', payload: error};
        }
    }

    public async check(): Promise<Commit<boolean>> {
        try {
            const value = await this.ls.$read('generic');
            const isSet = value !== null;
            return {type: 'CHECK_STORE', payload: isSet};
        } catch (error) {
            return {type: 'STORE_ERROR', payload: error};
        }
    }
}
