import DSUtils from '../ds-utils';

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
  $fetch(method, resource, body, customHeaders) {
    return new Promise((resolve, reject) => {
      if (method && resource) {
        let serverReq;
        if (method && method === 'GET') {
          const validatedHeaders = customHeaders ? DSUtils.validateHeaders(customHeaders) : {};
          const serializedBody = DSUtils.serialize(body);

          serverReq = fetch(this.endpoint + resource + serializedBody, {
            headers: {
              ...this.headers,
              ...validatedHeaders,
            },
            method,
          });
        } else if (method) {
          const validatedHeaders = customHeaders ? DSUtils.validateHeaders(customHeaders) : {};

          const request = {
            headers: {
              ...validatedHeaders,
              ...this.headers,
            },
            body,
            method,
          };
          serverReq = fetch(this.endpoint + resource, request);
        }
        return serverReq
          .then((data) => {
            if (data.status === 304) {
              return reject(data);
            }
            return resolve(data.json());
          })
          .catch(error => reject(error));
      }
      return reject(new Error('RESTDS: Invalid request'));
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

