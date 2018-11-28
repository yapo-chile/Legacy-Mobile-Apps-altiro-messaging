<template>
  <div>
    <yapo-header publish="Publicar"></yapo-header>
    <yapo-drawer ></yapo-drawer>
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
  import { AuthState } from '@/store/modules/auth/types';
  import tags from '@/utils/Tealium';

  const namespace: string = 'the-landing';

  @Component({
    components: {
      MessagingWidget,
    },
  })
  export default class TheLanding extends Vue {
    @State('messaging')
    public messaging!: MessagingState;

    @State('auth')
    public auth!: AuthState;

    @Action('setConfig', { namespace: 'messaging' })
    private setConfig: any;

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
            block: 'Bloquear usuario',
            delete: 'Eliminar conversación',
          },
          info: {
            writeYourMessage: 'Escribe tu mensaje...',
            attachment: {
              sentYou: {
                single: 'Archivo enviado',
                plural: '%{numberAttachments} archivos enviados',
              },
              file: 'Archivo adjunto',
            },
          },
          error: {
            adNotAvailable: 'Aviso no disponible',
            uploadFailed: 'Este tipo de archivos no está soportado. Por favor, inténtalo de nuevo con otro archivo.',
          },
          interaction: {
            confirmDelete: '¿Estás seguro que quieres borrar esta conversación?',
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
<style scoped>
</style>
