import Vuex from 'vuex';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import TheGeneric from '@/components/TheGeneric.vue';
import {GenericState} from '@/store/modules/generic/types';
import {mutations} from '@/store/modules/generic/mutations';
import {getters} from '@/store/modules/generic/getters';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheGeneric test', () => {
    let state: GenericState;
    let actions: any;
    let store: any;
    let wrapper: any;
    const namespaced: boolean = true;

    beforeEach(() => {
        state = {
            text: 'text',
            error: {state: false},
        };
        actions = {
            setText: jest.fn(),
            getText: jest.fn(),
            checkStore: jest.fn(),
        };

        store = new Vuex.Store({
            modules: {
                generic: {
                    state,
                    actions,
                    getters,
                    mutations,
                    namespaced,
                },
            },
        });
        wrapper = shallowMount(TheGeneric, {store, localVue});
    });
    it('should have a h1 element', () => {
        expect(wrapper.contains('h1')).toBeTruthy();
    });

    it('should have an input', () => {
        expect(wrapper.contains('.generic-input')).toBeTruthy();
    });

    it('should have a button', () => {
        expect(wrapper.contains('.generic-button')).toBeTruthy();
    });

});

