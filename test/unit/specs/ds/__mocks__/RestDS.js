import DSUtils from '@/ds/ds-utils';

/**
 * @class RestDS
 * @desc A CRUD data source for restful api
 */
export default class RestDS {
  /**
   * @method constructor
   * @param endpoint String REST endpoint (ie: https://api.org/
   * @param headers Object Header object (ie: { 'Content-Type': 'application/json'})
   */
  constructor(endpoint, headers) {
    this.endpoint = DSUtils.validateEndpoint(endpoint);
    this.headers = RestDS.setCustomHeaders(headers);
    this.dsUtils = DSUtils;
    this.result = `{
      "ads":[
        {
          "listId": "12345",
          "addedTime": "1519966395122",
          "title": "Hyundai Accent 2011 ultrafull",
          "region": "15",
          "category": "2020",
          "Price": "5150000",
          "image": "6666538578.jpg",
          "dateTime": "1519955337.33051",
          "adType": "0",
          "Currency": "peso"
        },
        {
          "listId": "123456",
          "addedTime": "1519966349655",
          "title": "Docena de sostenes NUEVOS",
          "region": "15",
          "category": "4020",
          "Price": "15000",
          "image": "9161043969.jpg",
          "dateTime": "1520037111.05481",
          "adType": "0",
          "Currency": "peso"
        }
      ]}`;
  }

  /**
   * @method $read
   * @desc Read wrapper
   * @param key String url (ie: 'users')
   * @param body String|Object querystring or object for the request.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the requested resource.
   */
  $read(key, body, customHeaders) {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('GET', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $get'));
    });
  }

  /**
   * @method $create
   * @param key String url (ie: 'users')
   * @param body Object object that should be created.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the created resource
   */
  $create(key, body, customHeaders) {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('POST', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $post'));
    });
  }

  /**
   * @method $update
   * @param key String url (ie: 'users')
   * @param body Object object that should be updated.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the updated resource.
   */
  async $update(key, body, customHeaders) {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('PUT', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $update'));
    });
  }

  /**
   * @method $delete
   * @param key String url (ie: 'users')
   * @param body Object object that should be deleted.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with a result of the deletion.
   */
  async $delete(key, body, customHeaders) {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('DELETE', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $delete'));
    });
  }

  /**
   * @method $fetch
   * @desc Wrapper for the js fetch API.
   * @param method String HTTP method (ie: GET POST PUT DELETE)
   * @param resource String url (ie: 'users')
   * @param body String|Object querystring or object for the request.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} Promise with a result of the fetch API.
   */
  $fetch(method, key) {
    return new Promise((resolve, reject) => {
      /**
       * api to favorites
       */
      if (/^fav/.exec(key)) {
        switch (method) {
          case 'GET':
            resolve(JSON.parse(this.result));
            break;
          case 'POST':
            resolve({ Status: 'OK' });
            break;
          case 'DELETE':
            resolve({ Status: 'OK' });
            break;
          default:
            reject('method not implement');
        }
      } else {
        reject('method not implement');
      }
    });
  }

  /**
   * @todo: Check why the default content-type header is not set when creating a new instance.
   * @method setCustomHeaders
   * @desc Set additional headers.
   * @param headers Header object with key:value representing http headers.
   * @returns {Headers} A Header object.
   */
  static setCustomHeaders(headers) {
    DSUtils.validateHeaders(headers);
    return { 'Content-Type': 'application/json', ...headers };
  }
}

