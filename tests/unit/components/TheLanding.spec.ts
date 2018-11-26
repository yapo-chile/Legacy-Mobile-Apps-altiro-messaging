import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TheLanding from '@/components/TheLanding.vue';
import { MessagingState } from '@/store/modules/messaging/types';
import { mutations } from '@/store/modules/messaging/mutations';
import { getters } from '@/store/modules/messaging/getters';
import { config } from '@/assets/messagingConfig';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheLanding test', () => {
  let state: MessagingState;
  let actions: any;
  let store: any;
  let wrapper: any;
  const namespaced: boolean = true;

  beforeEach(() => {
    state = {
      config,
    };
    actions = {};

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
  it('should have a messaging-widget element', () => {
    expect(wrapper.contains('.landing-messaging')).toBeTruthy();
  });
});

