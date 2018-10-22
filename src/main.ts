import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import tealiumLoad from '@/utils/tealiumLoad';

Vue.config.productionTip = false;

const checkEnv = () => /yapo\.cl/gm.exec(window.location.origin);
tealiumLoad(!checkEnv ? 'prod' : 'dev');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
