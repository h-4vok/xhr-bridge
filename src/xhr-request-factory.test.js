import { XhrRequestFactory } from './xhr-request-factory';
import { XhrRequestBuilder } from './xhr-request-builder';
import { HttpVerbs } from './http-verbs';

const suiteName = 'XhrRequestFactory';

const testRoute = 'items';
const testBody = { something: 2 };

describe(suiteName, () => {
  let subject;
  let implementor;
  let defaultRoot;
  let requestBuilder;

  beforeEach(() => {
    implementor = {};
    defaultRoot = '/rest/';
    requestBuilder = {};

    subject = new XhrRequestFactory(implementor, defaultRoot, requestBuilder);
  });

  test(`${suiteName} - constructor()`, () => {
    expect(subject.implementor).toBe(implementor);
    expect(subject.defaultRoot).toBe(defaultRoot);
    expect(subject.requestBuilder).toBe(requestBuilder);
  });

  test(`${suiteName} - constructor() without requestBuilder uses the default`, () => {
    subject = new XhrRequestFactory({}, '/rest/');

    expect(subject.requestBuilder instanceof XhrRequestBuilder).toBeTruthy();
    expect(subject.requestBuilder.defaultRouteRoot).toBe('/rest/');
  });

  const assertFactoryMethod = (verb, route, closure, body = null) => {
    subject = new XhrRequestFactory(implementor, defaultRoot);

    const buildRequestMock = jest.fn(() => {});
    subject.requestBuilder.buildRequest = buildRequestMock;

    closure();

    expect(buildRequestMock.mock.calls.length).toBe(1);
    expect(buildRequestMock.mock.calls[0][0]).toBe(verb);
    expect(buildRequestMock.mock.calls[0][1]).toBe(route);
    expect(buildRequestMock.mock.calls[0][2]).toBe(body);
    expect(buildRequestMock.mock.calls[0][3]).toBe(subject.implementor);
  };

  test(`${suiteName} - get() uses requestBuilder properly`, () => {
    assertFactoryMethod(HttpVerbs.get, testRoute, () => subject.get(testRoute));
  });

  test(`${suiteName} - post() uses requestBuilder properly`, () => {
    assertFactoryMethod(HttpVerbs.post, testRoute, () => subject.post(testRoute, testBody), testBody);
  });

  test(`${suiteName} - put() uses requestBuilder properly`, () => {
    assertFactoryMethod(HttpVerbs.put, testRoute, () => subject.put(testRoute, testBody), testBody);
  });

  test(`${suiteName} - del() uses requestBuilder properly`, () => {
    assertFactoryMethod(HttpVerbs.del, testRoute, () => subject.del(testRoute));
  });

  test(`${suiteName} - patch() uses requestBuilder properly`, () => {
    assertFactoryMethod(HttpVerbs.patch, testRoute, () => subject.patch(testRoute, testBody), testBody);
  });
});
