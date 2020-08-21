const checkEnv = () => /(www|m|www2){1}\.yapo\.cl/gm.exec(window.location.origin);
const isTealium: boolean = JSON.parse(process.env.VUE_APP_TEALIUM_ENABLED || 'false');
let inicialized = false;

const target: Document = document;
const type: string = 'script';
const element: any = target.createElement(type);

const view = (data: TealiumOptions) => {
  if (isTealium) {
    if (typeof utag === 'undefined') {
      element.addEventListener('load', () => {
        utag.view(data);
      });
    } else {
      utag.view(data);
    }
  }
};
const link = (data: TealiumOptions) => {
  if (isTealium) {
    if (typeof utag === 'undefined') {
      element.addEventListener('load', () => {
        utag.link(data);
      });
    } else {
      utag.link(data);
    }
  }
};

const load = (env: string, callback: () => void) => {
  const url: string = '//tags.tiqcdn.com/utag/schibsted/yapo/' + env + '/utag.js';
  element.src = url;
  element.type = 'text/java' + type;
  element.async = true;
  const element2: Element = target.getElementsByTagName(type)[0];
  if (element2 !== null && element2.parentNode !== null) {
    element2.parentNode.insertBefore( element, element2);
  }

  element.addEventListener('load', () => {
    callback();
    document.dispatchEvent(new CustomEvent('utagjs::loaded', {}));
  });
};

export default {
  install(eventName: string) {
    if (isTealium && !inicialized) {
      inicialized = true;
      (window as any).utag_cfg_ovrd = {noview : true};
      load(checkEnv() ? 'prod' : 'dev', () => {
        view({
          event_name: eventName,
        });
      });
    } else {
      view({
        event_name: eventName,
      });
    }
  },
  link,
  view,
};
