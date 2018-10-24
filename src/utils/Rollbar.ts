import { VueConstructor } from 'vue';
import Rollbar from 'vue-rollbar';

export default {
  install(Vue: VueConstructor) {
    Vue.use(Rollbar, {
      accessToken: '294dd12132da4e56bb8e9224de554ce7',
      enabled: JSON.parse(process.env.VUE_APP_ROLLBAR_ENABLED || 'false'),
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'production',
      },
    });
  },
};
