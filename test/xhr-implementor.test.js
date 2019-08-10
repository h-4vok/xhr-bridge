import { XhrImplementor } from '../src/xhr-implementor';
import { XhrBridgeConfig } from '../src/xhr-bridge-config';
import { XhrRequest } from '../src/xhr-request';

const suiteName = 'XhrImplementor';

describe(suiteName, () => {
  let logMock;
  let subject;
  let concreteImplementor;

  beforeEach(() => {
    concreteImplementor = { execute: () => {} };

    subject = new XhrImplementor(concreteImplementor);

    logMock = jest.fn(() => {});
    subject.log = logMock;
  });

  test(`${suiteName} - constructor`, () => {
    expect(subject.log).not.toBeNull();
    expect(subject.responseImplementor).toBe(concreteImplementor);
  });

  test(`${suiteName} - logValue`, () => {
    const key = 'property';
    const value = 200;

    subject.logValue(key, value);

    expect(logMock.mock.calls.length).toBe(1);
    expect(logMock.mock.calls[0][0]).toBe(`${key} - ${value}`);
  });

  test(`${suiteName} - logSeparator`, () => {
    subject.logSeparator();

    expect(logMock.mock.calls.length).toBe(1);
    expect(logMock.mock.calls[0][0]).toBe('###############################');
  });

  test(`${suiteName} - logEmtpyLine`, () => {
    subject.logEmptyLine();

    expect(logMock.mock.calls.length).toBe(1);
    expect(logMock.mock.calls[0][0]).toBe('');
  });

  test(`${suiteName} - logCallbacksLength`, () => {
    const req = {
      callbacks: {
        success: [() => {}, () => {}]
      }
    };

    subject.logCallbacksLength(req, 'success');

    expect(logMock.mock.calls.length).toBe(1);
    expect(logMock.mock.calls[0][0]).toBe(`success callbacks # - 2`);
  });

  test(`${suiteName} - execute without debug does nothing`, () => {
    XhrBridgeConfig.showDebugLogs = false;

    subject.execute();

    expect(logMock.mock.calls.length).toBeFalsy();
  });

  test(`${suiteName} - execute with debug logs all XhrRequest properties`, () => {
    const propertiesExpected = [
      'verb',
      'headers',
      'address',
      'body',
      'allowsDefaultSuccess',
      'allowsDefaultFailure',
      'allowsDefaultError'
    ];

    XhrBridgeConfig.showDebugLogs = true;

    const route = 'items';
    const body = { data: 10000 };

    subject.execute(new XhrRequest(route, body));
    expect(subject.log.mock.calls.length).toBeGreaterThan(0);

    propertiesExpected.forEach(element => {
      const propertyWasLoggedToConsole = subject.log.mock.calls.some(call => call[0].toString().startsWith(element));
      expect(propertyWasLoggedToConsole).toBe(true);
    });
  });
});
