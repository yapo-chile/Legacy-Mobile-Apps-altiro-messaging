import { AuthInterface } from '@/domain/services/AuthService';
import { ActionTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';
import { AuthFactory } from '@/domain/factories/AuthFactory';

const authSrv: AuthInterface = AuthFactory.createService();

export const actions: ActionTree<AuthState, RootState> = {
  async isSetUserData({ commit }) {
    try {
      const actionResponse = await authSrv.isSetUserData();
      return commit(actionResponse.type, actionResponse.payload);
    } catch (error) {
      throw error;
    }
  },
  async getUserData({ commit }) {
    try {
      const actionResponse = await authSrv.getUserData();
      return commit(actionResponse.type, actionResponse.payload);
    } catch (error) {
      throw error;
    }
  },
  async logoutUser({ commit }) {
    try {
      const actionResponse = await authSrv.logoutUser();
      return commit(actionResponse.type);
    } catch (error) {
      throw error;
    }
  },
};
