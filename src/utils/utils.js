/* eslint-disable no-param-reassign,max-len,no-continue,no-restricted-syntax,no-prototype-builtins,no-plusplus,no-useless-concat,no-useless-escape */

const utils = {
  existOnArray(id, arrayId) {
    return arrayId.indexOf(id) >= 0;
  },
  numberFormat(amount, decimals = 0) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
    decimals = decimals || 0; // por si la variable no fue fue pasada
    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) { return parseFloat(0).toFixed(decimals); }
    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = `${amount.toFixed(decimals)}`;

    const amountParts = amount.split(',');
    const regexp = /(\d+)(\d{3})/;

    while (regexp.test(amountParts[0])) { amountParts[0] = amountParts[0].replace(regexp, '$1' + '.' + '$2'); }

    return amountParts.join('.');
  },
  normalizePrice(price, type) {
    if (type === 'uf') {
      return `UF ${this.numberFormat(price.substring(0, price.length - 2))},${price.slice(-2)}`;
    }
    if (type === 'peso') {
      return `$ ${this.numberFormat(price)}`;
    }
    return false;
  },
  convertTimestamp(timestamp) {
    const d = new Date(timestamp * 1000); // Convert the passed timestamp to milliseconds
    const yyyy = d.getFullYear();
    const mm = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero based. Add leading 0.
    const dd = (`0${d.getDate()}`).slice(-2); // Add leading 0.
    const h = (`0${d.getHours()}`).slice(-2);
    const min = (`0${d.getMinutes()}`).slice(-2); // Add leading 0.
    let time = '';

    // ie: 2013-02-18, 8:35 AM
    time = `${yyyy}-${mm}-${dd} ${h}:${min}`;

    return time;
  },
  normalizeKeys(data) {
    if (data instanceof Array) {
      const result = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].PriceUF !== '') {
          data[i].PriceUF = this.normalizePrice(data[i].PriceUF, data[i].Currency);
          data[i].Price = this.normalizePrice(data[i].Price, 'peso');
        } else if (data[i].Price !== '') {
          data[i].Price = this.normalizePrice(data[i].Price, data[i].Currency);
        }
        result[i] = this.normalizeKeys(data[i]);
      }

      return result;
    }

    if (typeof data !== 'object') {
      return data;
    }

    const result = {};

    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      result[key.charAt(0).toLowerCase() + key.substring(1)] = this.normalizeKeys(data[key]);
    }

    return result;
  },
};

export default utils;
