import {
  HTTPRequest,
  getURLWithParams,
  type cancellableRequestType,
  type cancelRequestFunctionType,
} from 'common-files';

export { cancellableJSONRequest, cancellableRequestDelete, cancellableRequestPost, cancellableRequestGet, getAPIURL };

function cancellableJSONRequest(url: string, method = 'GET', requestBody?: null | object): cancellableRequestType {
  try {
    const controller = new AbortController();

    const cancelRequest: cancelRequestFunctionType = (reason) => {
      // reject promise?
      controller.abort(reason);
    };

    const { signal } = controller;

    const responsePromise = HTTPRequest(url, method, requestBody, signal).then((res) => {
      return res;
    });
    return { responsePromise, cancelRequest };
  } catch (err) {
    console.error(err);
    return { responsePromise: Promise.reject(err), cancelRequest: () => {} };
  }
}

function cancellableRequestGet(url: string, queryParmas: {}): cancellableRequestType {
  const urlWithParams = getURLWithParams(getAPIURL(url), queryParmas);
  return cancellableJSONRequest(urlWithParams, 'GET', null);
}

function cancellableRequestPost(url: string, requestBody = {}): cancellableRequestType {
  return cancellableJSONRequest(getAPIURL(url), 'POST', requestBody);
}

function cancellableRequestDelete(url: string, requestBody = {}): cancellableRequestType {
  return cancellableJSONRequest(getAPIURL(url), 'DELETE', requestBody);
}

function getAPIURL(endpoint: string) {
  console.log(import.meta.env);
  return `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_API_PREFIX}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}`;
}
