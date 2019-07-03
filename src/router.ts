import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import TheLanding from '@/components/TheLanding.vue';
import store from './store';
import utils from './utils/utils';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/:hash*',
      name: 'home',
      component: TheLanding,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/getLocalUserData');
  await store.dispatch('auth/getUserData');
  if (store.getters.isLoggedIn) {
    next();
  } else {
    if (to.path !== '/login') {
      window.location.href = utils.getSecureUrl(window) + '/login';
    }
    next();
  }
});

export default router;
