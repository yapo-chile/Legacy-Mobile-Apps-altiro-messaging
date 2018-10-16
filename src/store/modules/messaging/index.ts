import { Module } from 'vuex';
// import { actions } from '@/store/modules/messaging/actions';
import { getters } from '@/store/modules/messaging/getters';
import { mutations } from '@/store/modules/messaging/mutations';
import { MessagingState } from '@/store/modules/messaging/types';
import { RootState } from '@/store/types';

export const state: MessagingState = {
  config: {
    apiUrl: '/messaging-center/api/v1',
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
      },
      conversationDate(params: object) {
        /* format the conversation timestamps */
      },
    },
    translations: {
      /* override translations */
    },
    headers: {
      Authorization: 'Bearer <myToken>',
    },
    integrations: {
      '<integration-name>': '<custom-icon>',
    },
    highlights: {
      'com.schibsted.messaging.p2pmock': 'Click me, I am super cool!',
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
};
