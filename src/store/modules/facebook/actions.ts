import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { FacebookFactory } from '@/domain/factories/FacebookFactory';
import { FacebookInterface } from '@/domain/services/FacebookDataService';
import { FacebookDataState } from './types';

const facebookSrv: FacebookInterface = FacebookFactory.createService();

export const actions: ActionTree<FacebookDataState, RootState> = {
  async setUserImage({ commit }) {
    try {
      const actionResponse = await facebookSrv.getImage();
      return commit(actionResponse.type, actionResponse.payload);
    } catch (error) {
      throw error;
    }
  },
  async setId({ commit }) {
    try {
      const actionResponse = await facebookSrv.getId();
      return commit(actionResponse.type, actionResponse.payload);
    } catch (error) {
      throw error;
    }
  },
};
