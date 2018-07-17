import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import vuexI18n from 'vuex-i18n';
import i18nEs from '@Yapo/altiro-i18n';
import {generic} from '@/store/modules/generic';
import {RootState} from '@/store/types';
import {onTranslationNotFound} from '@/store/i18n';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0',
        generic: undefined,
    },
    modules: {
        generic,
    },
};

const storeInstance = new Vuex.Store<RootState>(store);

Vue.use(
    vuexI18n.plugin,
    storeInstance,
    {moduleName: 'i18n', onTranslationNotFound},
);
Vue.i18n.add('es', i18nEs.es);
Vue.i18n.set('es');

export default storeInstance;
