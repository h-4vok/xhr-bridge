import { XhrRequest } from './xhr-request';
import { XhrBridgeConfig } from './xhr-bridge-config';

class XhrRequestBuilder {
  constructor(defaultRoot) {
    this.defaultRoot = defaultRoot || XhrBridgeConfig.defaultRouteRoot;
  }

  buildRequest = (verb, route, body = null, implementor) => {
    const fullAddress = `${this.defaultRoot}${route}`;

    const req = new XhrRequest(fullAddress, body);
    req.implementor = implementor;
    req.verb = verb;

    return req;
  };
}

export { XhrRequestBuilder };
