<template>
  <div ref="widget" class="messaging-widget">
  </div>
</template>
<script lang="ts">
  import { Action, State } from 'vuex-class';
  import { Component, Vue, Prop } from 'vue-property-decorator';
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
    public widgetParams!: object;
    @Prop()
    public faastParams!: object;

    private created() {
      this.getFaast();
    }

    private async getFaast() {
      const fun = await faast(
        'messaging-widget',
        'pre',
        {
          siteName: 'yapo',
          _context: {
            userId: 'xuser',
          },
        },
        {},
      );
      const params = objectAssign(
        {},
        { selector: this.$refs.widget },
        this.widgetParams,
      );
      const msg = new Messaging.Widget(params);
    }
  }
</script>
<style lang="scss" scoped>
  @import "../styles/MessagingWidget";
</style>
