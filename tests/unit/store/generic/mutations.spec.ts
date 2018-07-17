import {GenericState, StoreError} from '@/store/modules/generic/types';
import {mutations} from '@/store/modules/generic/mutations';

describe('Generic/Mutations', () => {
    it('The state should change when the mutation is executed', () => {
        expect.assertions(2);
        let state: GenericState;
        state = {
            error: {state: false},
            text: 'default-text',
        };
        mutations.TEXT_UPDATED(state, 'changed-text');

        expect(state.error.state).toEqual(false);
        expect(state.text).toEqual('changed-text');
    });

    it('The state should change when the mutation fails', () => {
        expect.assertions(2);
        let state: GenericState;
        state = {
            error: {state: false},
        };

        const storeError: StoreError = {state: true, message: 'generic error', name: 'generic-error'};
        mutations.STORE_ERROR(state, storeError);

        expect(state.error.state).toEqual(true);
        expect(state.error.message).toEqual(storeError.message);
    });
});
