import { MessagingConfigInterface } from '@/domain/services/MessagingConfigService';
import { ActionTree } from 'vuex';
import { MessagingState, StoreError} from '@/store/modules/messaging/types';
import { RootState } from '@/store/types';
import { MessagingConfigFactory } from '@/domain/factories/MessagingConfigFactory';

const GenSrv: MessagingConfigInterface = MessagingConfigFactory.createService();

export const actions: ActionTree<MessagingState, RootState> = {
  async setConfig({commit}, data) {
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
