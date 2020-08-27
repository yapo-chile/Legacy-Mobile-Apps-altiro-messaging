import { MutationTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';

function GetAllowedProCategories() {
  const categories = process.env.VUE_APP_REWARDS_ALLOWED_CATEGORIES || '';
  const parsedCategories = categories.split(',');

  return parsedCategories;
}

function GetProMainCategories(isProFor: string[]) {
  const firstNumbers = isProFor.map((category) => (
    category.charAt(0)
  ));
  const filteredCategories = firstNumbers.filter((fNumber, i) => (
    firstNumbers.indexOf(fNumber) === i
  )).map((fNumber) => fNumber + '000');

  return filteredCategories;
}

const IS_LOGGED_IN = (state: any, update: any) => {
  state.isLoggedIn = update;
};

const CAN_ACCESS_REWARDS = (state: any, update: any) => {
  state.canAccessRewards = update;
};

export const mutations: MutationTree<AuthState> = {
  UPDATE_USER_DATA(state, update: any) {
    const isProFor = update.isProFor || [];

    state.user = {
      ...update,
      isProForMainCategories: GetProMainCategories(isProFor),
    };

    const email = state.user.email || '';
    if (email !== '') {
      IS_LOGGED_IN(state, true);
    }

    let canAccessRewards = false;
    const allowedCategories = GetAllowedProCategories();

    isProFor.forEach((category: any) => {
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
      isProForMainCategories: [],
    };
    IS_LOGGED_IN(state, false);
    CAN_ACCESS_REWARDS(state, false);
  },
};

