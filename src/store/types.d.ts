import { GenericState } from '@/store/modules/generic/types';

export interface Commit<T> {
    type: string;
    payload?: T;
}

export interface RootState {
    version: string;
    generic?: GenericState;
}
