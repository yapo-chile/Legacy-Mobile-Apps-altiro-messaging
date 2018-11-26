import utils from '@/utils/utils';

const checkEnv = () => /yapo\.cl/gm.exec(window.location.origin);


const load = (env: string, callback: () => void) => {
  const url: string = '//tags.tiqcdn.com/utag/schibsted/yapo/' + env + '/utag.js';
  const target: Document = document;
  const type: string = 'script';
  const element: any = target.createElement(type);
  element.src = url;
  element.type = 'text/java' + type;
  element.async = true;
  const element2: Element = target.getElementsByTagName(type)[0];
  if (element2 !== null && element2.parentNode !== null) {
    element2.parentNode.insertBefore( element, element2);
  }
  element.addEventListener('load', callback);
};

let inicialized = false;

export default {
  install(eventName: string) {
    if (JSON.parse(process.env.VUE_APP_TEALIUM_ENABLED || 'false') && !inicialized) {
      inicialized = true;
      (window as any).utag_cfg_ovrd = {noview : true};
      utils.checkPulseInstance();
      load(!checkEnv ? 'prod' : 'dev', () => {
        utag.view({
          event_name: eventName,
        });
      });
    } else {
      utag.view({
        event_name: eventName,
      });
    }
  },
};
