import { MutationTree } from 'vuex';
import { MessagingState, StoreError} from '@/store/modules/messaging/types';


export const mutations: MutationTree<MessagingState> = {
    CONFIG_UPDATED(state, payload: any) {
      state.config = payload;
    },
};
