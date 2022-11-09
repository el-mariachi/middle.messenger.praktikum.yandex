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
  data?: IRequestBody;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function parseOptions(options: Options) {
  const { method } = options;
  let { headers, data } = options;
  if (!headers || Object.keys(headers).length === 0) {
    headers = undefined;
  }
  if (!data || Object.keys(data).length === 0) {
    data = undefined;
  }
  return { method, headers, data };
}

function queryStringify(data: IRequestBody) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
}
export class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const data = parseOptions({ ...options, method: METHOD.GET });
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

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
