export class XhrRequest {
  implementor = null;

  verb = null;

  route = null;

  body = null;

  headers = {};

  queries = {};

  allowsDefaultSuccess = true;

  allowsDefaultFailure = true;

  allowsDefaultError = true;

  callbacks = {
    success: [],
    failure: [],
    error: []
  };

  constructor(route, body = null) {
    this.route = route;
    this.body = body;
  }

  setHeader = (key, value) => {
    this.headers[key] = value;
    return this;
  };

  setHeaders = headers => {
    this.headers = headers;
    return this;
  };

  setQuery = (key, value) => {
    this.queries[key] = value;
    return this;
  };

  setQueries = queries => {
    this.queries = queries;
    return this;
  };

  preventDefaultSuccess = () => {
    this.allowsDefaultSuccess = false;
    return this;
  };

  preventDefaultFailure = () => {
    this.allowsDefaultFailure = false;
    return this;
  };

  preventDefaultError = () => {
    this.allowsDefaultError = false;
    return this;
  };

  success = callback => {
    this.callbacks.success.push(callback);
    return this;
  };

  failure = callback => {
    this.callbacks.failure.push(callback);
    return this;
  };

  error = callback => {
    this.callbacks.error.push(callback);
    return this;
  };

  go = () => {
    this.implementor.execute(this);
  };
}
