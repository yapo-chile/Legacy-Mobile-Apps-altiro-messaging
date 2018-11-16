import { ActionTree } from 'vuex';
import { MessagingState, StoreError} from '@/store/modules/messaging/types';
import { RootState } from '@/store/types';

export const actions: ActionTree<MessagingState, RootState> = {
  async setConfig({commit}, data) {
    try {
      return commit('CONFIG_UPDATED', data);
    } catch (error) {
      const storeError: StoreError = {state: true, message: error, name: 'STORE_ERROR'};
      return commit('STORE_ERROR', storeError);
    }
  },
};
