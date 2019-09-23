import { GetterTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<AuthState, RootState> = {
  avatar(state: AuthState) {
    const socialId = (typeof state.user.socialId !== 'undefined') ? state.user.socialId : '';
    if (socialId !== '') {
      return `http://graph.facebook.com/${socialId}/picture?type=square`;
    }
    return '';
  },
  userName(state: AuthState) {
    return state.user.name;
  },
  shortName(state: AuthState) {
    return state.user.shortName;
  },
  userEmail(state: AuthState) {
    return state.user.email;
  },
  userID(state: AuthState) {
    return state.user.userID;
  },
  accSession(state: AuthState) {
    return state.accSession;
  },
  isLoggedIn(state: AuthState) {
    return state.isLoggedIn;
  },
};
