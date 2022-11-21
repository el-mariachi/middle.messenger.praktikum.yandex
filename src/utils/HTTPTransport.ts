import queryStringify from './queryString';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface IHeaders {
  [k: string]: string;
}

interface IRequestBody {
  [k: string]: unknown;
}

type Options = {
  method: METHOD;
  headers?: IHeaders;
  timeout?: number;
  data?: IRequestBody | FormData;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

function parseOptions(options: Options) {
  const { method } = options;
  let { headers, data } = options;
  if (!headers || Object.keys(headers).length === 0) {
    headers = undefined;
  }
  // data may be FormData, so no Object.keys() check
  if (!data) {
    data = undefined;
  }
  return { method, headers, data };
}

export class HTTPTransport {
  constructor(protected _baseURL: string = '') {}
  protected buildURL(targetURL: string) {
    return this._baseURL === '' ? targetURL : `${this._baseURL}${targetURL}`;
  }
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const { data } = parseOptions({ ...options, method: METHOD.GET });
    if (data) {
      url = `${url}?${queryStringify(data)}`;
    }
    return this.request(url, { ...options, method: METHOD.GET }, options.timeout);
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PATCH }, options.timeout);
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  request(
    url: string,
    options: Options = { method: METHOD.GET },
    timeout: number | undefined
  ): Promise<XMLHttpRequest> {
    if (!url) {
      throw new Error('Bad request url');
    }
    url = this.buildURL(url);
    const { method, headers, data } = parseOptions(options);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      // set headers if any
      if (headers) {
        Object.entries(headers).forEach(([headerName, headerValue]) => {
          xhr.setRequestHeader(headerName, headerValue);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
