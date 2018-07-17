import {Module} from 'vuex';
import {actions} from '@/store/modules/generic/actions';
import {getters} from '@/store/modules/generic/getters';
import {mutations} from '@/store/modules/generic/mutations';
import {GenericState} from '@/store/modules/generic/types';
import {RootState} from '@/store/types';

export const state: GenericState = {
    text: 'hola',
    error: {state: false},
};

const namespaced: boolean = true;

export const generic: Module<GenericState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
