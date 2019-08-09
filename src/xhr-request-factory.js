import { HttpVerbs } from './http-verbs';
import { XhrRequestBuilder } from './xhr-request-builder';

export class XhrRequestFactory {
  constructor(implementor, defaultRoot = null, requestBuilder = null) {
    this.implementor = implementor;
    this.defaultRoot = defaultRoot;
    this.requestBuilder = requestBuilder || new XhrRequestBuilder(this.defaultRoot);
  }

  get = address => this.requestBuilder.buildRequest(HttpVerbs.get, address, null, this.implementor);

  post = (address, body) => this.requestBuilder.buildRequest(HttpVerbs.post, address, body, this.implementor);

  put = (address, body) => this.requestBuilder.buildRequest(HttpVerbs.put, address, body, this.implementor);

  del = address => this.requestBuilder.buildRequest(HttpVerbs.del, address, null, this.implementor);

  patch = (address, body) => this.requestBuilder.buildRequest(HttpVerbs.patch, address, body, this.implementor);
}
