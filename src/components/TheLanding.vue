<template>
  <div>
    <header>
      <button @click="clickEvent('link_header')">> link Header</button>
    </header>
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
      headers: {
        Authorization: this.auth.accSession,
      },
      translations: {
        status: {
          message: {
            error: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.DELIVERY_FAILURE', {}),
          },
        },
      },
    });
  }

  private clickEvent(type: string) {
    utag.link({
      event_name: 'messaging_center_click',
    });
  }
}
</script>
<style scoped>
</style>
