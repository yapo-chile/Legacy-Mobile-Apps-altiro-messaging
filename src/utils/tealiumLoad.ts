export default function tealiumLoad(env: string) {
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
}
