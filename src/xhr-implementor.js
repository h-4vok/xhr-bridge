import uuidv4 from 'uuid/v4';
import { XhrBridgeConfig } from './xhr-bridge-config';

/* eslint-disable no-console */
/* This class has DEBUG specific code so we need console.log */

export class XhrImplementor {
  constructor(responseImplementor) {
    this.responseImplementor = responseImplementor;
    this.log = console.log;
  }

  logValue = (key, value) => this.log(`${key} - ${value}`);

  logSeparator = () => this.log('###############################');

  logEmptyLine = () => this.log('');

  logCallbacksLength = (req, key) => this.logValue(`${key} callbacks #`, req.callbacks[key].length);

  execute(req) {
    if (!XhrBridgeConfig.showDebugLogs) return;

    req.identity = uuidv4();

    this.logRequestInformation(req);
  }

  logRequestInformation(req) {
    this.logSeparator();
    this.log(`Executing XHR request - ${req.identity}`);
    this.logSeparator();

    this.logValue('verb', req.verb);
    this.logValue('headers', req.headers);
    this.logValue('address', req.address);
    this.logValue('body', req.body);
    this.logValue('allowsDefaultSuccess', req.allowsDefaultSuccess);
    this.logValue('allowsDefaultFailure', req.allowsDefaultFailure);
    this.logValue('allowsDefaultError', req.allowsDefaultError);

    this.logCallbacksLength(req, 'success');
    this.logCallbacksLength(req, 'failure');
    this.logCallbacksLength(req, 'error');

    this.logEmptyLine();
    this.logSeparator();
    this.logEmptyLine();
  }
}
