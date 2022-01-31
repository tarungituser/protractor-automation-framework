/* eslint-disable global-require,max-len,no-underscore-dangle */
export class MonotypeRestWrapper {
    requestPromiseNative;
    request;

    constructor() {
      // Added .defaults({ jar: true }) to keep the authentication cookies hooked
      this.requestPromiseNative = require('request-promise-native')
        .defaults({
          jar: true,
          rejectUnauthorized: false,
          strictSSL: false,
        });
      this.request = {
        headers: {
          // Intentionally left blank to avoid undefined error
        },
      };
    }

    get requestObject() {
      return this.requestPromiseNative;
    }

    /**
     * Request option container for details about the request.
     * @param arg
     * @return {Object}
     */
    options(arg) {
      this.request = arg;
      return this;
    }

    /**
     * Adds headers
     * @param arg
     * @return {Object}
     */
    headers(arg) {
      this.request.headers = arg;
      return this;
    }

    /**
     * Basic authentication setup
     * @param {string} Authentication Username
     * @param {string} Authentication Password
     * @param {boolean} Optional; Defaults to true; Flag to determine whether Request should send the basic authentication header
     * along with the request. Upon being false, Request will retry with a proper authentication header after receiving a
     * 401 response from the server (which must contain a WWW-Authenticate header indicating the required authentication method)
     * @return {Object}
     */

    /**
     * Adds a header
     * @param {string} key
     * @param {string} value
     * @return {Object}
     */
    header(key, value) {
      this.request.headers[key] = value;
      return this;
    }

    /**
     * Basic authentication setup
     * @param {string} user Authentication Username
     * @param {string} pass Authentication Password
     * @param {boolean} sendImmediately Optional; Defaults to true;
     * Flag to determine whether Request should send the basic authentication header
     * along with the request. Upon being false, Request will retry with a proper authentication header after receiving a
     * 401 response from the server (which must contain a WWW-Authenticate header indicating the required authentication method)
     * @returns {MonotypeRestWrapper}
     */
    auth(user, pass, sendImmediately = true) {
      this.request.auth = {
        user,
        pass,
        sendImmediately,
      };
      return this;
    }

    /**
     * Object should consist of name: 'path' otherwise use name and path.
     * name (String) - File field name
     * path (String | Object) - File value, A String will be parsed based on its value. If path contains http or https Request
     * will handle it as a remote file. If path does not contain http or https then requestPromiseNative will assume that it is the path
     * to a local file and attempt to find it using path.resolve. An Object is directly set, so you can do pre-processing
     * if you want without worrying about the string value.
     * @param arg
     * @return {MonotypeRestWrapper}
     */
    attach(arg) {
      this.request.form = arg;
      return this;
    }

    /**
     * Attaches a field to the multipart-form request, with pre-processing
     * @param name
     * @param value
     * @returns {MonotypeRestWrapper}
     */
    field(name, value) {
      this.request[name] = value;
      return this;
    }

    /**
     * Not Implemented in Promise-Request-Native
     * @return {Object}
     */
    stream() {
      this.request.stream();
      return this;
    }

    /**
     * Serialize value as query-string representation
     * @param arg
     * @returns {MonotypeRestWrapper}
     */
    query(arg) {
      this.request.qs = arg;
      return this;
    }

    /**
     * Set _content-type_ header with type passed through `mime.lookup()` when necessary.
     * @param arg
     * @returns {MonotypeRestWrapper}
     */
    type(arg) {
      const contentType = 'Content-Type';
      this.request.headers[contentType] = arg;
      return this;
    }

    /**
     * Data marshalling for HTTP request body data
     * Use this method when request body is having JSON data only
     * @param arg
     * @param jsonTypeRequest
     * @returns {MonotypeRestWrapper}
     */
    send(arg, jsonTypeRequest = true) {
      this.request.body = arg;
      this.request.json = jsonTypeRequest;
      return this;
    }

    asJson() {
      this.request.json = true;
      return this;
    }

    /**
     * Sets multipart array containing multipart-form objects on Request.options
     * to be sent along with the Request.
     * Each objects property with the exclusion of body is treated as a header value.
     * Each body value must be pre-processed if necessary when using this method.
     * @param arg
     * @returns {MonotypeRestWrapper}
     */
    part(arg) {
      const form = this.requestPromiseNative(this.request).form();
      form.append('FileContents', arg);
      return this;
    }

    /**
     * Creates POST request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    post(url) {
      this.request.uri = url;
      this.request.method = 'POST';
      return this;
    }

    /**
     * Creates PATCH request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    patch(url) {
      this.request.uri = url;
      this.request.method = 'PATCH';
      return this;
    }

    /**
     * Creates PUT request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    put(url) {
      this.request.uri = url;
      this.request.method = 'PUT';
      return this;
    }

    /**
     * Creates HEAD request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    head(url) {
      this.request.uri = url;
      this.request.method = 'HEAD';
      return this;
    }

    /**
     * Creates GET request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    get(url) {
      this.request.uri = url;
      this.request.method = 'GET';
      return this;
    }

    /**
     * Creates DELETE request
     * @param {string} url
     * @returns {MonotypeRestWrapper}
     */
    delete(url) {
      this.request.uri = url;
      this.request.method = 'DELETE';
      return this;
    }

    /**
     * Sends HTTP Request and awaits Response finalization. Request compression and Response decompression occurs here.
     * Upon HTTP Response post-processing occurs and invokes `callback` with a single argument, the `[Response](#response)` object.
     * @returns {Promise<Response>}
     */
    end() {
      this.request.resolveWithFullResponse = true;
      const _this = this;
      return new Promise((resolve) => {
        _this
          .requestPromiseNative(_this.request)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            resolve(err);
          });
      });
    }
}
