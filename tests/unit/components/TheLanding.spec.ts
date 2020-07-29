import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TheLanding from '@/components/TheLanding.vue';
import { MessagingState } from '@/store/modules/messaging/types';
import { mutations } from '@/store/modules/messaging/mutations';
import { getters } from '@/store/modules/messaging/getters';
import { AuthState } from '@/store/modules/auth/types';
import { getters as aGetters } from '@/store/modules/auth/getters';
import { mutations as aMutations } from '@/store/modules/auth/mutations';
import { config } from '@/assets/messagingConfig';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheLanding test', () => {
  let state: MessagingState;
  let authState: AuthState;
  let actions: any;
  let store: any;
  let wrapper: any;
  const namespaced: boolean = true;

  beforeEach(() => {
    state = {
      config,
    };

    authState = {
      accSession: '',
      user: {
        name: '',
        shortName: '',
        email: '',
        socialId: '',
        userId: '',
        isProFor: [],
      },
      isLoggedIn: false,
      isProfessional: false,
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
        auth: {
          state: authState,
          actions,
          getters: aGetters,
          mutations: aMutations,
          namespaced,
        },
      },
    });
    wrapper = shallowMount(TheLanding, {
      store,
      localVue,
      beforeCreate() {
        (this as any).$t = () => ('mock-i18n');
      },
    });
  });
  it('should have a messaging-widget element', () => {
    expect(wrapper.contains('.landing-messaging')).toBeTruthy();
  });
});

