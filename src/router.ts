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
  await store.dispatch('auth/getUserData');
  next();
});

export default router;
