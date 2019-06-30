import { AuthInterface } from '@/domain/services/AuthService';
import { ActionTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';
import { AuthFactory } from '@/domain/factories/AuthFactory';
import { ProfileFactory, IProfileService } from '@/domain/factories/ProfileFactory';

const authSrv: AuthInterface = AuthFactory.createService();
const profileSrv: IProfileService = ProfileFactory.createService();

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
      const response = await profileSrv.get();
      return commit('UPDATE_PROFILE', response);
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
