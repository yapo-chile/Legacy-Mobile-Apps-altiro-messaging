<template>
  <div class="the-landing">
    <the-header></the-header>
    <h1 class="the-landing__title">Mensajes</h1>
    <MessagingWidget class="landing-messaging" :widgetParams="messaging.config" :faast="messaging.config" /> 
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Getter, State } from 'vuex-class';
  import { HeaderContainer } from '@yapo/altiro-components';
  import { MessagingState } from '@/store/modules/messaging/types';
  import { config } from '@/assets/messagingConfig';
  import { messaging } from '@/store/modules/messaging';
  import { MessagingConfig } from '@/domain/entities/MessagingEntity';
  import MessagingWidget from './MessagingWidget.vue';
  import TheHeader from './TheHeader.vue';
  import tags from '@/utils/Tealium';
  import utils from '@/utils/utils';

  const namespace: string = 'the-landing';

  @Component({
    components: {
      MessagingWidget,
      HeaderContainer,
      TheHeader,
    },
  })
  export default class TheLanding extends Vue {
    @State('messaging')
    public messaging!: MessagingState;

    @Action('setConfig', { namespace: 'messaging' })
    private setConfig: any;

    @Getter('accSession', { namespace: 'auth' })
    private accSession: any;

    @Getter('userID', { namespace: 'auth' })
    private userID: any;

    private async created() {
      await this.setConfig({ ... config,
        format: {
          messageDate: this.formatMessageDate,
        },
        headers: {
          Authorization: this.accSession,
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
        pulse: {
          providerId: 'yapocl',
          userRealm: 'yapo.cl',
          pulseUserId: this.userID,
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
  @import '../styles/TheLanding';
</style>
