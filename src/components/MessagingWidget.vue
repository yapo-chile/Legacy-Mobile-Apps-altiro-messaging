<template>
  <div ref="widget" class="messaging-widget">
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { MessagingConfig } from '@/domain/entities/MessagingEntity';
  import faast from '@faast/faast-client';

  declare var Messaging: any;
  const namespace: string = 'messaging-widget';

  const objectAssign = (target: any, ...params: any[]) => {
    params.forEach((source: any) => {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    });
    return target;
  };

  @Component
  export default class MessagingWidget extends Vue {
    @Prop()
    public widgetParams!: any;

    @Prop()
    public faastParams!: object;

    private messaging: any;

    private async created() {
      await this.getMessaging();
      this.initMessaging();
    }

    private initMessaging() {
      if (this.messaging) {
        this.messaging.destroy();
      }
      const params = objectAssign(
        {},
        { selector: this.$refs.widget },
        this.widgetParams,
      );
      this.messaging = new Messaging.Widget(params);
    }

    private async getMessaging() {
      const checkEnv = () => /yapo\.cl/gm.exec(window.location.origin);
      await faast(
        'messaging-widget',
        checkEnv() ? 'pro' : 'pre',
        {
          siteName: 'yapo',
          _context: {
            userId: 'xuser',
          },
        },
        {
          cssBefore: '#before-css-faast',
        },
      );
    }
  }
</script>
<style lang="scss">
  @import "../styles/MessagingWidget";
</style>
