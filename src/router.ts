import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import TheLanding from '@/components/TheLanding.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'the-landing',
      component: TheLanding,
    },
  ],
});
