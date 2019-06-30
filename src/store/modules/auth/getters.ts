import { GetterTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<AuthState, RootState> = {
  avatar(state: AuthState) {
    return state.user.avatar;
  },
  userName(state: AuthState) {
    return state.user.userName;
  },
  shortName(state: AuthState) {
    return state.user.shortName;
  },
  userEmail(state: AuthState) {
    return state.user.userEmail;
  },
  accSession() {
    return '';
  },
  isLoggedIn(state: AuthState) {
    return state.isLoggedIn;
  },
};
