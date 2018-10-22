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
  import MessagingWidget from './MessagingWidget.vue';
  const namespace: string = 'the-landing';

  @Component({
    components: {
      MessagingWidget,
    },
  })
  export default class TheLanding extends Vue {
    @State('messaging')
    public messaging!: MessagingState;

    private data() {
      return {
        input: '',
      };
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
