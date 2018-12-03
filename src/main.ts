import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import Tealium from '@/utils/Tealium';
import Rollbar from '@/utils/Rollbar';

Vue.config.productionTip = false;

Vue.config.ignoredElements = ['yapo-header', 'yapo-drawer'];

Rollbar.install(Vue);

Tealium.install('messaging_center_app');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
