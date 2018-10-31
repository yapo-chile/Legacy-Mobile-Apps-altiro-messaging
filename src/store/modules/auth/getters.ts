import { GetterTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<AuthState, RootState> = {
  avatar(state: AuthState) {
    return state.avatar;
  },
  userName(state: AuthState) {
    return state.userName;
  },
  shortName(state: AuthState) {
    return state.shortName;
  },
  userEmail(state: AuthState) {
    return state.userEmail;
  },
  accSession(state: AuthState) {
    return state.accSession;
  },
  isLoggedIn(state: AuthState) {
    return state.isLoggedIn;
  },
};
