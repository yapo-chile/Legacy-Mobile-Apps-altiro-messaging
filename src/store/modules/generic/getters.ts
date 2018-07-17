import { GetterTree } from 'vuex';
import { GenericState } from '@/store/modules/generic/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<GenericState, RootState> = {
  text(state: GenericState) {
    return state.text;
  },
};
