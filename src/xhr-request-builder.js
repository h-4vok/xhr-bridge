import { XhrRequest } from './xhr-request';
import { XhrBridgeConfig } from './xhr-bridge-config';

export class XhrRequestBuilder {
  constructor(defaultRouteRoot = null) {
    this.defaultRouteRoot = defaultRouteRoot || XhrBridgeConfig.defaultRouteRoot;
  }

  buildRequest = (verb, route, body, implementor) => {
    const fullAddress = `${this.defaultRouteRoot}${route}`;

    const req = new XhrRequest(fullAddress, body);
    req.implementor = implementor;
    req.verb = verb;

    return req;
  };
}
