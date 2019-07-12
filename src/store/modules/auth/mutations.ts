import { MutationTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';

const IS_LOGGED_IN = (state: any, update: any) => {
  state.isLoggedIn = update;
};

export const mutations: MutationTree<AuthState> = {
  UPDATE_USER_DATA(state, update: any) {
    state.user = update;
    const email = state.user.email || '';
    if (email !== '') {
      IS_LOGGED_IN(state, true);
    }
  },
  UPDATE_USER_SESSION(state, update: any) {
    const accSession = (typeof update !== 'undefined' && update.accSession) ? update.accSession : '';
    if ( accSession !== '') {
      state.accSession = accSession;
    }
  },
  IS_LOGGED_IN,
  DELETE_USER_DATA(state) {
    state.user = {
      socialId: '',
      name: '',
      shortName: '',
      email: '',
    };
    IS_LOGGED_IN(state, false);
  },
};

