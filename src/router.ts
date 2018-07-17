import Vue from 'vue';
import Router from 'vue-router';
import TheGeneric from '@/components/TheGeneric.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/altiro-seed/',
  routes: [
    {
      path: '/generic',
      name: 'the-generic',
      component: TheGeneric,
    },
  ],
});
