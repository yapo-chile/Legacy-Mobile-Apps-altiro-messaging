import { Module } from 'vuex';
import { actions } from '@/store/modules/messaging/actions';
import { getters } from '@/store/modules/messaging/getters';
import { mutations } from '@/store/modules/messaging/mutations';
import { MessagingState } from '@/store/modules/messaging/types';
import { RootState } from '@/store/types';

export const state: MessagingState = {
  config: {
    apiUrl: JSON.stringify(process.env.VUE_APP_API_URL),
    itemUrl: 'ss',
    userId: 'xuser',
    lang: 'es_ES',
    baseUrl: '/',
    mode: 'history',
    maxInputLength: 5000,
    features: {
      displayAvatar: true,
      modalIntegration: true,
      addAttachments: true,
      injectMetaTags: true,
    },
    format: {
      userProfile: '/user/:userid:',
      price(price: string) {
        return 'Now for only' + price;
      },
      messageDate(params: object) {
        /* format the message timestamps */
        return '';
      },
      conversationDate(params: object) {
        /* format the conversation timestamps */
        return '';
      },
    },
    translations: {
      /* override translations */
    },
    headers: {
    },
    integrations: {
    },
    highlights: {
    },
    interaction: {
      alert: (config: object, success: () => void, error: () => void) => {
        /* custom alert logic */
      },
    },
  },
};

const namespaced: boolean = true;

export const messaging: Module<MessagingState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
