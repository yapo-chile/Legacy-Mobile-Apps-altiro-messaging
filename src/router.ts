import Vue from 'vue';
import Router from 'vue-router';
import TheLanding from '@/components/TheLanding.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: 'messaging-center/',
  routes: [
    {
      path: '/app',
      name: 'the-landing',
      component: TheLanding,
    },
  ],
});
