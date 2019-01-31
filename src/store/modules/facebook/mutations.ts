import { MutationTree } from 'vuex';
import { FacebookDataState } from '@/store/modules/facebook/types';

export const mutations: MutationTree<FacebookDataState> = {
  UPDATE_IMAGE(state: FacebookDataState, image: string) {
    state.userImage = image;
  },
  UPDATE_ID(state: FacebookDataState, id: string) {
    state.userId = id;
  },
};

