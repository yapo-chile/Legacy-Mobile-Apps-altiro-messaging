import { GetterTree } from 'vuex';
import { FacebookDataState } from '@/store/modules/facebook/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<FacebookDataState, RootState> = {
  userImage(state: FacebookDataState) {
    return state.userImage;
  },
  userId(state: FacebookDataState) {
    return state.userId;
  },
};
