<template>
  <div>
    <yapo-header :style="{display: ((auth.isLoggedIn) ? '' : 'none' )}"
      :publish="$t('YAPO_HEADER.PUBLISH')"
      :home-url="homeUrl"
      :publish-url="publishUrl"
      :login-url="loginUrl"
      :account-url="myAccountUrl"
      :messaging-url="messagingUrl"
      default-avatar="//static.yapo.cl/shared/icons/header/no-img-user.svg"></yapo-header>
    <yapo-drawer
      :greeting="$t('BUILDERS.HELLO') + ', '"
      :welcome="'Bienvenido'"
      :login="'Iniciar sesión'"
      :login-url="loginUrl">
      <drawer-content slot="content" class="yapo-drawer-content"></drawer-content>
    </yapo-drawer>
    <MessagingWidget class="landing-messaging" :widgetParams="messaging.config" :faast="messaging.config" /> 
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, State } from 'vuex-class';
  import { MessagingState } from '@/store/modules/messaging/types';
  import { config } from '@/assets/messagingConfig';
  import { messaging } from '@/store/modules/messaging';
  import { MessagingConfig } from '@/domain/entities/MessagingEntity';
  import MessagingWidget from './MessagingWidget.vue';
  import DrawerContent from './DrawerContent.vue';
  import { AuthState } from '@/store/modules/auth/types';
  import tags from '@/utils/Tealium';
  import utils from '@/utils/utils';

  const namespace: string = 'the-landing';

  @Component({
    components: {
      MessagingWidget,
      DrawerContent,
    },
  })
  export default class TheLanding extends Vue {
    @State('messaging')
    public messaging!: MessagingState;

    @State('auth')
    public auth!: AuthState;

    @Action('setConfig', { namespace: 'messaging' })
    private setConfig: any;

    private homeUrl: string = '';
    private url: string = '';
    private secureUrl: string = '';
    private publishUrl: string = '';
    private loginUrl: string = '';

    // content variables
    private messagingUrl: string = '';
    private myAccountUrl: string = '';

    private beforeMount() {
      this.url = utils.getUrl();
      this.secureUrl = utils.getSecureUrl();
      this.homeUrl = this.url;
      this.publishUrl = this.secureUrl + '/ai';
      this.loginUrl = this.secureUrl + '/login';
      this.messagingUrl = '#';
      this.myAccountUrl = this.secureUrl + '/cuenta/view';
    }
    private async created() {
      await this.setConfig({ ... config,
        format: {
          messageDate: this.formatMessageDate,
        },
        headers: {
          Authorization: this.auth.accSession,
        },
        translations: {
          status: {
            message: {
              error: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.DELIVERY_FAILURE', {}),
            },
          },
          action: {
            block: Vue.i18n.translate('MESSAGING_CENTER.ACTIONS.BLOCK', {}),
            delete: Vue.i18n.translate('MESSAGING_CENTER.ACTIONS.DELETE', {}),
          },
          info: {
            writeYourMessage: Vue.i18n.translate('MESSAGING_CENTER.INFO.WRITE_YOUR_MESSAGE', {}),
            attachment: {
              sentYou: {
                single: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.SENT_YOU.SINGLE', {}),
                plural: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.SENT_YOU.PLURAL',
                  {
                    numberAttachments: '%{numberAttachments}',
                  }),
              },
              file: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.FILE', {}),
            },
          },
          error: {
            adNotAvailable: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.AD_NOT_AVALAIBLE', {}),
            uploadFailed: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.UPLOAD_FAILED', {}),
          },
          interaction: {
            confirmDelete:  Vue.i18n.translate('MESSAGING_CENTER.INTERACTION.CONFIRM_DELETE', {}),
          },
        },
        track: (event: string, payload: any): void => {
          utag.link({ event_name: 'messaging_center_app', data: {event, payload}});
        },
      });
    }

    private formatMessageDate(data: any): string {
      let displayedDate;

      if (data.isToday) {
        displayedDate = `<strong>${data.translator('info.today')}</strong>, ${data.format('hh:mm', data.date)}`;
      } else {
        if (data.isYesterday) {
          displayedDate = `<strong>${data.translator('info.yesterday')}</strong>, ${data.format('hh:mm', data.date)}`;
        } else {
          displayedDate = `<strong>${data.format('dd-MM-yyyy', data.date)}</strong>, ${data.format('hh:mm', data.date)}`;
        }
      }
      return displayedDate;
    }

    private clickEvent(type: string) {
      tags.link({
        event_name: 'messaging_center_click',
      });
    }
  }
</script>
<style lang="scss" scoped>
</style>
