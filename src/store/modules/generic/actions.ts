import {GenericInterface} from '@/domain/services/GenericService';
import {ActionTree} from 'vuex';
import {GenericState, StoreError} from '@/store/modules/generic/types';
import {RootState} from '@/store/types';
import {GenericFactory} from '@/domain/factories/GenericFactory';

const GenSrv: GenericInterface = GenericFactory.createService();

export const actions: ActionTree<GenericState, RootState> = {
    async setText({commit}, data) {
        try {
            const actionResponse = await GenSrv.save(data || null);
            return commit(actionResponse.type, actionResponse.payload);
        } catch (error) {
            const storeError: StoreError = {state: true, message: error, name: 'STORE_ERROR'};
            return commit('STORE_ERROR', storeError);
        }
    },
    async getText({commit}) {
        try {
            const actionResponse = await GenSrv.get();
            return commit(actionResponse.type, actionResponse.payload);
        } catch (error) {
            const storeError: StoreError = {state: true, message: error, name: 'STORE_ERROR'};
            return commit('STORE_ERROR', storeError);
        }
    },
    async checkStore({commit}) {
        try {
            const actionResponse = await GenSrv.check();
            return commit(actionResponse.type, actionResponse.payload);
        } catch (error) {
            const storeError: StoreError = {state: true, message: error, name: 'STORE_ERROR'};
            return commit('STORE_ERROR', storeError);
        }
    },
};
