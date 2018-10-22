import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import TheLanding from '@/components/TheLanding.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTE_BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'the-landing',
      component: TheLanding,
    },
  ],
});
