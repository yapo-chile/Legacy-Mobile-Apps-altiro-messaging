import { MutationTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';

function GetAllowedProCategories() {
  const categories = process.env.VUE_APP_REWARDS_ALLOWED_CATEGORIES || '';
  const parsedCategories = categories.split(',');

  return parsedCategories;
}

const IS_LOGGED_IN = (state: any, update: any) => {
  state.isLoggedIn = update;
};

const CAN_ACCESS_REWARDS = (state: any, update: any) => {
  state.canAccessRewards = update;
};

export const mutations: MutationTree<AuthState> = {
  UPDATE_USER_DATA(state, update: any) {
    state.user = update;

    const email = state.user.email || '';
    const isProFor = state.user.isProFor || [];

    if (email !== '') {
      IS_LOGGED_IN(state, true);
    }

    let canAccessRewards = false;
    const allowedCategories = GetAllowedProCategories();

    isProFor.forEach((category) => {
      if (allowedCategories.includes(category)) {
        canAccessRewards = true;
      }
    });

    CAN_ACCESS_REWARDS(state, canAccessRewards);
  },
  UPDATE_USER_SESSION(state, update: any) {
    const accSession = (typeof update !== 'undefined' && update.accSession) ? update.accSession : '';
    if ( accSession !== '') {
      state.accSession = accSession;
    }
  },
  CAN_ACCESS_REWARDS,
  IS_LOGGED_IN,
  DELETE_USER_DATA(state) {
    state.user = {
      socialId: '',
      name: '',
      shortName: '',
      email: '',
      userId: '',
      isProFor: [],
    };
    IS_LOGGED_IN(state, false);
    CAN_ACCESS_REWARDS(state, false);
  },
};

