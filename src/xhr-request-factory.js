import { HttpVerbs } from './http-verbs';
import { XhrRequestBuilder } from './xhr-request-builder';

export class XhrRequestFactory {
  constructor(implementor, defaultRoot = null, requestBuilder = null) {
    this.implementor = implementor;
    this.defaultRoot = defaultRoot;
    this.requestBuilder = requestBuilder || new XhrRequestBuilder(this.defaultRoot);
  }

  get = route => this.requestBuilder.buildRequest(HttpVerbs.get, route, null, this.implementor);

  post = (route, body) => this.requestBuilder.buildRequest(HttpVerbs.post, route, body, this.implementor);

  put = (route, body) => this.requestBuilder.buildRequest(HttpVerbs.put, route, body, this.implementor);

  del = route => this.requestBuilder.buildRequest(HttpVerbs.del, route, null, this.implementor);

  patch = (route, body) => this.requestBuilder.buildRequest(HttpVerbs.patch, route, body, this.implementor);
}
