import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface TealiumOptions {
    event_name: string;
    data?: any;
  }
  namespace utag {
    function link(opts: TealiumOptions): any;
    function view(opts: TealiumOptions): any;
  }
}
