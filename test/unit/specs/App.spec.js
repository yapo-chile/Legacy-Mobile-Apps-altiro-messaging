import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store/store';

describe('App.vue', () => {
  const Constructor = Vue.extend(App);
  const vm = new Constructor({
    router,
    store,
  }).$mount();
  it('should be defined', () => {
    expect(vm).toBeDefined();
  });
});
