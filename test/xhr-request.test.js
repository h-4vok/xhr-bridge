import { XhrRequest } from '../src/xhr-request';

const suiteName = 'XhrRequest';

describe(suiteName, () => {
  let subjectWithoutBody;
  let subjectWithBody;
  const route = '/rest/items';
  const defaultBody = { id: 100, order: 'asc' };

  beforeEach(() => {
    subjectWithBody = new XhrRequest(route, defaultBody);
    subjectWithoutBody = new XhrRequest(route);
  });

  const assertConstructorStatus = (subject, body) => {
    expect(subject.body).toBe(body);
    expect(subject.implementor).toBeNull();
    expect(subject.verb).toBeNull();
    expect(subject.route).toBe(route);
    expect(subject.headers).toStrictEqual({});
    expect(subject.queries).toStrictEqual({});
    expect(subject.allowsDefaultSuccess).toBe(true);
    expect(subject.allowsDefaultFailure).toBe(true);
    expect(subject.allowsDefaultError).toBe(true);
    expect(subject.callbacks).toStrictEqual({
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
});
