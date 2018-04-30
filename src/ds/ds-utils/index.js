/**
 * @class DSUtils
 * @desc Utility snippets to DataSources
 */
export default class DSUtils {
  /**
   * @method storageAvailable
   * @desc Test if the storage provided is available in the browser or not.
   * (Only for localStorage & sessionStorage)
   * @param type String name of the storage
   * @returns {boolean}
   */
  static storageAvailable(type) {
    const storage = window[type];
    try {
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        e.code === 22 || // everything except Firefox
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  /**
   * @method validateHeaders
   * @desc validate headers to add.
   * @param headers Object headers to evaluate
   * @returns Object Valid object or throws an exception.
   */
  static validateHeaders(headers) {
    if (headers && typeof (headers) === 'object') {
      return headers;
    }
    throw Error(`DSUtils: Invalid headers. ${headers.toString()}`);
  }

  /**
   * @todo: create a function that validates that is a valid http/s resource should be useful
   * @method validateEndpoint
   * @desc validate that is a valid string endpoint
   * @param endpoint String the string to be validated
   * @returns {string} the endpoint if is valid, otherwise should throw an Error.
   */
  static validateEndpoint(endpoint) {
    if (endpoint && typeof (endpoint) === 'string' && endpoint.length > 10) {
      return endpoint;
    }
    throw Error(`DSUtils: Invalid endpoint${endpoint.toString()}`);
  }

  /**
   * @method serialize
   * @desc Serialize an object to a valid http querystring.
   * If the string is a valid querystring, returns the string.
   * @param body String|Object the object to be serialized.
   * @returns {string} the serialized object.
   */
  static serialize(body) {
    if (body && typeof (body) === 'object') {
      return `?${Object.keys(body).reduce((a, k) => {
        a.push(`${k}=${ encodeURIComponent(body[k])}`);
        return a;
      }, []).join('&')}`;
    } else if (typeof (body) === 'string' && body.substring(0, 1) === '?') {
      return body;
    }
    return '';
  }
}
