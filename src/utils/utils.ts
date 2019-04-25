/* tslint:disable:max-line-length */
declare global {
  // tslint:disable-next-line:interface-name
  interface Window { pulse: any; }
}

const utils = {
  existOnArray(id: any, arrayId: any[]) {
    return arrayId.indexOf(id) >= 0;
  },
  numberFormat(amount: string, decimals = 0) {
    amount += ''; // por si pasan un numero en vez de un string
    const parsedAmount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
    decimals = decimals || 0; // por si la variable no fue fue pasada
    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(parsedAmount) || parsedAmount === 0) { return parseFloat('0').toFixed(decimals); }
    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = `${parsedAmount.toFixed(decimals)}`;

    const amountParts = amount.split(',');
    const regexp = /(\d+)(\d{3})/;

    while (regexp.test(amountParts[0])) { amountParts[0] = amountParts[0].replace(regexp, '$1' + '.' + '$2'); }

    return amountParts.join('.');
  },
  normalizePrice(price: string, type: string) {
    if (type === 'uf') {
      return `UF ${this.numberFormat(price.substring(0, price.length - 2))},${price.slice(-2)}`;
    }
    if (type === 'peso') {
      return `$ ${this.numberFormat(price)}`;
    }
    return false;
  },
  convertTimestamp(timestamp: number) {
    const d = new Date(timestamp * 1000); // Convert the passed timestamp to milliseconds
    const yyyy = d.getUTCFullYear();
    const mm = (`0${d.getUTCMonth() + 1}`).slice(-2); // Months are zero based. Add leading 0.
    const dd = (`0${d.getUTCDate()}`).slice(-2); // Add leading 0.
    const h = (`0${d.getUTCHours()}`).slice(-2);
    const min = (`0${d.getUTCMinutes()}`).slice(-2); // Add leading 0.
    let time = '';

    // ie: 2013-02-18, 8:35 AM
    time = `${yyyy}-${mm}-${dd} ${h}:${min}`;

    return time;
  },
  normalizeKeys(data: any): any[] {
    if (data instanceof Array) {
      const arrayResult: any[] = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].PriceUF !== '') {
          data[i].PriceUF = this.normalizePrice(data[i].PriceUF, data[i].Currency);
          data[i].Price = this.normalizePrice(data[i].Price, 'peso');
        } else if (data[i].Price !== '') {
          data[i].Price = this.normalizePrice(data[i].Price, data[i].Currency);
        }
        arrayResult[i] = this.normalizeKeys(data[i]);
      }

      return arrayResult;
    }

    if (typeof data !== 'object') {
      return data;
    }

    const result: any = {};

    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      const pascalizedKey = this.pascalCalize(key);

      result[pascalizedKey] = this.normalizeKeys(data[key]);
    }

    return result;
  },
  pascalCalize(word: string): string {
    const firstChar = word.charAt(0).toLowerCase();
    const remanent = word.substring(1);
    return firstChar + remanent;
  },
  checkPulseInstance() {
    if (!window.pulse) {
      // a global pulse object has to be present to avoid autoloader errors
      window.pulse = window.pulse || function pulse() {
        window.pulse.q = window.pulse.q || [];
        window.pulse.q.push(arguments);
      };
    }
    window.pulse.q = window.pulse.q || [];
  },
  getSecureUrl(windowParam: Window) {
    const origin = windowParam.location.origin;
    let secureUrl = '';

    if (origin.includes('www.')) {
      secureUrl = origin.replace('www.', 'www2.');
    } else if (origin.includes('m.')) {
      secureUrl = origin.replace('m.', 'www2.');
    } else if (origin.includes('www2.')) {
      secureUrl = origin;
    } else {
      secureUrl = origin.replace('://', '://www2.');
    }
    secureUrl = secureUrl.replace('http://', 'https://');
    return secureUrl;
  },
  getUrl(windowParam: Window) {
    const origin = windowParam.location.origin;
    let baseUrl = '';

    if (origin.includes('://www2.')) {
      baseUrl = origin.replace('://www2.', '://www.');
    } else if (origin.includes('://m.')) {
      baseUrl = origin;
    } else if (origin.includes('://www.')) {
      baseUrl = origin;
    } else {
      baseUrl = origin.replace('://', '://www.');
    }
    return baseUrl.replace('http://', 'https://');
  },
};

export default utils;
