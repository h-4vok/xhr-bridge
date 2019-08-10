import { XhrRequestBuilder } from '../src/xhr-request-builder';
import { XhrBridgeConfig } from '../src/xhr-bridge-config';
import { HttpVerbs } from '../src/http-verbs';
import { XhrRequest } from '../src/xhr-request';

const suiteName = 'XhrRequestBuilder';

describe(suiteName, () => {
  let subject;

  test(`${suiteName} - constructor with no default root takes it from configuration.`, () => {
    XhrBridgeConfig.defaultRouteRoot = '/defaultRoot/';
    subject = new XhrRequestBuilder();

    expect(subject.defaultRouteRoot).toBe(XhrBridgeConfig.defaultRouteRoot);
  });

  test(`${suiteName} - constructor with parameter takes my parameter`, () => {
    XhrBridgeConfig.defaultRouteRoot = 'not-this-one-please';
    const defaultRoot = 'take-this-one';
    subject = new XhrRequestBuilder(defaultRoot);

    expect(subject.defaultRouteRoot).toBe(defaultRoot);
  });

  const testBuildRequest = body => {
    const rootRoute = '/rest/';
    const reqRoute = 'items';
    const implementor = { something: 2 };
    subject = new XhrRequestBuilder(rootRoute);

    const req = subject.buildRequest(HttpVerbs.get, reqRoute, body, implementor);

    expect(req instanceof XhrRequest).toBe(true);
    expect(req.implementor).toBe(implementor);
    expect(req.verb).toBe(HttpVerbs.get);
    expect(req.body).toBe(body);
    expect(req.route).toBe(`${rootRoute}${reqRoute}`);
  };

  test(`${suiteName} - buildRequest with null body`, () => {
    testBuildRequest(null);
  });

  test(`${suiteName} - buildRequest with an actual body`, () => {
    testBuildRequest({
      itemId: 10,
      anotherProp: 'category_1'
    });
  });
});
