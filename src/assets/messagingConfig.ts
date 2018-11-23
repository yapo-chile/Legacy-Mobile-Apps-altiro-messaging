export const config = {
    apiUrl: '/messaging/api/v1',
    itemUrl: '/messaging/api/v1/ads',
    userId: 'xuser',
    lang: 'es_ES',
    baseUrl: process.env.VUE_APP_BASE_URL || '',
    mode: 'history',
    maxInputLength: 5000,
    features: {
      displayAvatar: true,
      modalIntegration: true,
      addAttachments: true,
      injectMetaTags: true,
    },
    format: {
      userProfile: undefined,
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
      // tslint:disable-next-line:variable-name
      alert: (_config: object, success: () => void, error: () => void) => {
        /* custom alert logic */
      },
    },
};
