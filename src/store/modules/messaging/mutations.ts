import { MutationTree } from 'vuex';
import { MessagingState, StoreError} from '@/store/modules/messaging/types';


export const mutations: MutationTree<MessagingState> = {
    CONFIG_UPDATE(state, payload: string) {
        state.config = state.config;
    },
};
