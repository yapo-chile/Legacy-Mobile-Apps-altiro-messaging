import { AuthInterface } from '@/domain/services/AuthService';
import { ActionTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';
import { AuthFactory } from '@/domain/factories/AuthFactory';
import { ProfileFactory, Profile } from '@/domain/factories/ProfileFactory';

const authSrv: AuthInterface = AuthFactory.createService();

export const actions: ActionTree<AuthState, RootState> = {
  async getUserData({ commit, getters }) {
    try {
      const profileSrv: Profile = ProfileFactory.createService(getters.accSession);
      const response = await profileSrv.getUserData();
      return commit(response.type, response.payload);
    } catch (error) {
      throw error;
    }
  },
  async getLocalUserData({ commit }) {
    try {
      const response = await authSrv.getUserData();
      return commit(response.type, response.payload);
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
