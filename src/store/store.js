import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import i18nEs from '@Yapo/altiro-i18n';
import actions from './actions';
import getters from './getters';
import generic from './modules/generic';

Vue.use(Vuex);

/* @todo: not sure if this is the best way to expose
a function that should be tested. */
export const onTranslationNotFound = (locale, key) => {
  switch (key) {
    case '200':
      return 'intl ok';
    default:
      return key;
  }
};

const store = new Vuex.Store({
  modules: {
    generic,
  },
  actions,
  getters,
});

Vue.use(
  vuexI18n.plugin,
  store,
  { moduleName: 'i18n', onTranslationNotFound });

Vue.i18n.add('es', i18nEs.es);
Vue.i18n.set('es');

export default store;
