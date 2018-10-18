import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TheLanding from '@/components/MessagingWidget.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MessagingWidget test', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(TheLanding, { localVue });
  });
  it('should have a messaging-widget element', () => {
    expect(wrapper.contains('.messaging-widget')).toBeTruthy();
  });
});

