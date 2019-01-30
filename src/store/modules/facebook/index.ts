import { Module } from 'vuex';
import { actions } from '@/store/modules/facebook/actions';
import { getters } from '@/store/modules/facebook/getters';
import { mutations } from '@/store/modules/facebook/mutations';
import { FacebookDataState } from '@/store/modules/facebook/types';
import { RootState } from '@/store/types';

export const state: FacebookDataState = {
  userId: '',
  userImage: '',
};

const namespaced: boolean = true;

export const facebookData: Module<FacebookDataState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
