import { Module } from 'vuex';
import { actions } from '@/store/modules/auth/actions';
import { getters } from '@/store/modules/auth/getters';
import { mutations } from '@/store/modules/auth/mutations';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';

export const state: AuthState = {
  accSession: '',
  user: {
    name: '',
    shortName: '',
    email: '',
    socialId: '',
    userId: '',
  },
  isLoggedIn: false,
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
