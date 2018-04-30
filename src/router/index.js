import Vue from 'vue';
import Router from 'vue-router';
import TheGeneric from '../components/TheGeneric';

Vue.use(Router);

export default new Router({
  routes: [
    {
      mode: 'history',
      path: '/',
      name: 'the-generic',
      component: TheGeneric,
    },
  ],
});
