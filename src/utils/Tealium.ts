const checkEnv = () => /yapo\.cl/gm.exec(window.location.origin);


const load = (env: string) => {
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
};

export default {
  install(eventName: string) {
    if (JSON.parse(process.env.VUE_APP_TEALIUM_ENABLED || 'false')) {
      // tslint:disable-next-line:variable-name
      const utag_data = {
        event_name: eventName,
      };
      load(!checkEnv ? 'prod' : 'dev');
    }
  },
};
