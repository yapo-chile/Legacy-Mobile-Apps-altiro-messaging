import {MutationTree} from 'vuex';
import {GenericState, StoreError} from '@/store/modules/generic/types';


export const mutations: MutationTree<GenericState> = {
    TEXT_UPDATED(state, payload: string) {
        state.error = {state: false};
        state.text = payload;
    },
    STORE_ERROR(state, payload: StoreError) {
        state.error = payload;
    },
};
