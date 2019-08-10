import { XhrRequest } from '../src/xhr-request';

const suiteName = 'XhrRequest';

describe(suiteName, () => {
  let subjectWithoutBody;
  let subjectWithBody;
  let subject;
  const route = '/rest/items';
  const defaultBody = { id: 100, order: 'asc' };

  beforeEach(() => {
    subjectWithBody = new XhrRequest(route, defaultBody);
    subjectWithoutBody = new XhrRequest(route);
    subject = subjectWithBody;
  });

  const assertConstructorStatus = (subjectToAssert, body) => {
    expect(subjectToAssert.body).toBe(body);
    expect(subjectToAssert.implementor).toBeNull();
    expect(subjectToAssert.verb).toBeNull();
    expect(subjectToAssert.route).toBe(route);
    expect(subjectToAssert.headers).toStrictEqual({});
    expect(subjectToAssert.queries).toStrictEqual({});
    expect(subjectToAssert.allowsDefaultSuccess).toBe(true);
    expect(subjectToAssert.allowsDefaultFailure).toBe(true);
    expect(subjectToAssert.allowsDefaultError).toBe(true);
    expect(subjectToAssert.callbacks).toStrictEqual({
      success: [],
      failure: [],
      error: []
    });
  };

  test(`${suiteName} - constructor without body`, () => {
    assertConstructorStatus(subjectWithoutBody, null);
  });

  test(`${suiteName} - constructor with body`, () => {
    assertConstructorStatus(subjectWithBody, defaultBody);
  });

  test(`${suiteName} - setHeader`, () => {
    const headerKey = 'X-XSRF-TOKEN';
    const headerValue = 'some-value';
    const output = subject.setHeader(headerKey, headerValue);

    expect(output === subject).toBe(true);
    expect(subject.headers[headerKey]).toBe(headerValue);
  });

  test(`${suiteName} - chained setHeader`, () => {
    subject
      .setHeader('header1', 'value1')
      .setHeader('header2', 'value2')
      .setHeader('header3', 'value3');

    for (let i = 1; i <= 3; i++) {
      expect(subject.headers[`header${i}`]).toBe(`value${i}`);
    }
  });

  test(`${suiteName} - setHeaders`, () => {
    const headers = {
      header1: 1,
      header2: 2
    };
    const output = subject.setHeaders(headers);

    expect(output === subject).toBe(true);
    expect(subject.headers).toStrictEqual(headers);
  });

  test(`${suiteName} - setHeaders chained only uses last headers passed`, () => {
    const firstHeaders = {
      header1: 1,
      header2: 2
    };
    const lastHeaders = {
      header3: 3,
      header4: 4,
      header5: 5
    };
    subject.setHeaders(firstHeaders).setHeaders(lastHeaders);

    expect(subject.headers).toStrictEqual(lastHeaders);
  });

  test(`${suiteName} - setQuery`, () => {
    const queryKey = 'order';
    const queryValue = 'asc';
    const output = subject.setQuery(queryKey, queryValue);

    expect(output === subject).toBe(true);
    expect(subject.queries[queryKey]).toBe(queryValue);
  });

  test(`${suiteName} - setQuery chained`, () => {
    subject
      .setQuery('q1', '1')
      .setQuery('q2', '2')
      .setQuery('q3', '3')
      .setQuery('q4', '4')
      .setQuery('q5', '5');

    for (let i = 1; i <= 5; i++) {
      expect(subject.queries[`q${i}`]).toBe(i.toString());
    }
  });

  test(`${suiteName} - setQueries`, () => {
    const queries = {
      order: 'asc',
      category: 'fancy',
      origin: 'Argentina'
    };
    const output = subject.setQueries(queries);

    expect(output === subject).toBe(true);
    expect(subject.queries).toStrictEqual(queries);
  });

  test(`${suiteName} - setQueries chained only takes latest queries`, () => {
    const firstQueries = {
      order: 'asc',
      category: 'fancy'
    };
    const lastQueries = {
      order: 'desc',
      category: 'trash'
    };
    subject.setQueries(firstQueries).setQueries(lastQueries);

    expect(subject.queries).toBe(lastQueries);
  });

  const testPreventDefault = name => {
    const output = subject[`preventDefault${name}`]();

    expect(output === subject).toBe(true);
    expect(subject[`allowsDefault${name}`]).toBe(false);
  };

  test(`${suiteName} - preventDefaultSuccess`, () => testPreventDefault('Success'));
  test(`${suiteName} - preventDefaultFailure`, () => testPreventDefault('Failure'));
  test(`${suiteName} - preventDefaultError`, () => testPreventDefault('Error'));

  const testAddOneCallback = name => {
    const callback = () => {};

    const output = subject[name](callback);

    expect(output === subject).toBe(true);
    expect(subject.callbacks[name].length).toBe(1);
    expect(subject.callbacks[name][0]).toBe(callback);
  };

  test(`${suiteName} - add success callback`, () => testAddOneCallback('success'));
  test(`${suiteName} - add failure callback`, () => testAddOneCallback('failure'));
  test(`${suiteName} - add error callback`, () => testAddOneCallback('error'));

  const testAddSeveralCallbacks = name => {
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};

    subject[name](callback1)
      [name](callback2)
      [name](callback3);

    expect(subject.callbacks[name].length).toBe(3);
    expect(subject.callbacks[name][0] === callback1).toBe(true);
    expect(subject.callbacks[name][1] === callback2).toBe(true);
    expect(subject.callbacks[name][2] === callback3).toBe(true);
  };

  test(`${suiteName} - add several success callbacks`, () => testAddSeveralCallbacks('success'));
  test(`${suiteName} - add several failure callbacks`, () => testAddSeveralCallbacks('failure'));
  test(`${suiteName} - add several error callbacks`, () => testAddSeveralCallbacks('error'));

  test(`${suiteName} - go calls the execute method of the implementor`, () => {
    const executeMock = jest.fn(() => {});

    subject.implementor = {
      execute: executeMock
    };

    subject.go();

    expect(executeMock.mock.calls.length).toBe(1);
    expect(executeMock.mock.calls[0][0] === subject).toBe(true);
  });
});
