import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TheLanding from '@/components/TheLanding.vue';
import { MessagingState } from '@/store/modules/messaging/types';
import { mutations } from '@/store/modules/messaging/mutations';
import { getters } from '@/store/modules/messaging/getters';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheGeneric test', () => {
  let state: MessagingState;
  let actions: any;
  let store: any;
  let wrapper: any;
  const namespaced: boolean = true;

  beforeEach(() => {
    state = {
      config: {},
    };
    actions = {
      setText: jest.fn(),
      getText: jest.fn(),
      checkStore: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        messaging: {
          state,
          actions,
          getters,
          mutations,
          namespaced,
        },
      },
    });
    wrapper = shallowMount(TheLanding, { store, localVue });
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

