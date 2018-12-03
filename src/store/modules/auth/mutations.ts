import { MutationTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';

const IS_LOGGED_IN = (state: any, update: any) => {
  state.isLoggedIn = update;
};

export const mutations: MutationTree<AuthState> = {
  UPDATE_USER_DATA(state, update: any) {
    state.userName = update.name;
    state.userEmail = update.email;
    state.accSession = update.accSession;
  },
  IS_LOGGED_IN,
  DELETE_USER_DATA(state) {
    state.userName = '';
    state.userEmail = '';
    state.accSession = '';
    IS_LOGGED_IN(state, false);
  },
};

