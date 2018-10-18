import { GetterTree } from 'vuex';
import { MessagingState } from '@/store/modules/messaging/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<MessagingState, RootState> = {
  config(state: MessagingState) {
    return state.config;
  },
};
