import {getters} from '@/store/modules/generic/getters';
import {GenericState} from '@/store/modules/generic/types';

describe('store/generic/getters', () => {

    it('should return the state as is', () => {
        expect.assertions(1);
        const getterQuery: GenericState = {
            text: 'mock-text',
            error: {state: false},
        };
        const getterResult = (getters as any).text(getterQuery);

        expect(getterResult).toEqual(getterQuery.text);
    });
});
