import IProfileService from '@yapo-services/profile';

export { IProfileService };

export interface MessagingFeatures {
  displayAvatar: boolean;
  modalIntegration: boolean;
  injectMetaTags: boolean;
  addAttachments: boolean;
}

export interface MessagingFormat {
  userProfile: string | undefined;
  price: (params: string) => string;
  messageDate: (params: object) => string;
  conversationDate: (params: object) => string;
}

export interface MessagingInteraction {
  alert: (config: object, success: () => void, error: () => void) => void;
}

export interface MessagingConfig {
  apiUrl: string;
  itemUrl: string;
  userId: string;
  lang?: string;
  baseUrl: string;
  mode?: string;
  maxInputLength?: number;
  features?: MessagingFeatures;
  format?: MessagingFormat;
  translations?: object;
  headers?: object;
  integrations?: object;
  highlights?: object;
  interaction?: MessagingInteraction;
  track?: any;
}
