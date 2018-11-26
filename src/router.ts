import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import TheLanding from '@/components/TheLanding.vue';
import store from './store';

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
  await store.dispatch('auth/isSetUserData');
  if (store.getters['auth/isLoggedIn']) {
    await store.dispatch('auth/getUserData');
    next();
  } else {
    if (to.path !== '/login') {
      window.location.href = '/login';
    }
    next();
  }
});

export default router;
