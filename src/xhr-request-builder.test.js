import { XhrRequestBuilder } from './xhr-request-builder';
import { XhrBridgeConfig } from './xhr-bridge-config';

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
});
