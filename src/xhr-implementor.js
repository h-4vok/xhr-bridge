import uuidv4 from 'uuid/v4';
import { XhrBridgeConfig } from './xhr-bridge-config';

/* eslint-disable no-console */
/* This class has DEBUG specific code so we need console.log */

export class XhrImplementor {
  constructor(responseImplementor) {
    this.responseImplementor = responseImplementor;
  }

  logValue = (key, value) => console.log(`${key} - ${value}`);

  logSeparator = () => console.log('###############################');

  logEmptyLine = () => console.log('');

  logPropertyValue = (req, key) => this.logValue(key, req[key]);

  logCallbacksLength = (req, key) => this.logValue(`${key} callbacks #`, req.callbacks[key].length);

  execute(req) {
    if (XhrBridgeConfig.showDebugLogs) return;

    req.identity = uuidv4();

    this.logRequestInformation(req);
  }

  logRequestInformation(req) {
    this.logSeparator();
    console.log(`Executing XHR request - ${req.identity}`);
    this.logSeparator();

    this.logPropertyValue('verb', req.verb);
    this.logPropertyValue('headers', req.headers);
    this.logPropertyValue('address', req.address);
    this.logPropertyValue('body', req.body);
    this.logPropertyValue('allowsDefaultSuccess', req.allowsDefaultSuccess);
    this.logPropertyValue('allowsDefaultFailure', req.allowsDefaultFailure);
    this.logPropertyValue('allowsDefaultError', req.allowsDefaultError);

    this.logCallbacksLength(req, 'success');
    this.logCallbacksLength(req, 'failure');
    this.logCallbacksLength(req, 'error');

    this.logEmptyLine();
    this.logSeparator();
    this.logEmptyLine();
  }
}
