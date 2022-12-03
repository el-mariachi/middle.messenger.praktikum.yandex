import { HTTPTransport } from './HTTPTransport';
import queryStringify from './queryString';

const xhrMock: Partial<XMLHttpRequest> = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  response: 'Success',
};
function resetXhrMock() {
  (xhrMock.open as unknown as jest.Mock).mockClear();
  (xhrMock.send as unknown as jest.Mock).mockClear();
  (xhrMock.setRequestHeader as unknown as jest.Mock).mockClear();
}

function createTransport(base = '') {
  return new HTTPTransport(base);
}
// let xhrSpy: jest.SpyInstance;
beforeAll(() => {
  jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
});
afterAll(() => {
  // window.XMLHttpRequest = originalXHR;
});
beforeEach(() => {
  resetXhrMock();
});

describe('The HTTPTransport class', () => {
  test('should throw if not porvided with a URL', () => {
    const transport = createTransport();
    expect(() => {
      transport.get('');
    }).toThrow('Bad request url');
  });
  test('should perform a GET request', async () => {
    const transport = createTransport();
    transport.get('test');
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('GET', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith();
  });
  test('should perform a POST request', () => {
    const transport = createTransport();
    transport.post('test');
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('POST', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith();
  });
  test('should perform a PUT request', () => {
    const transport = createTransport();
    transport.put('test');
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('PUT', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith();
  });
  test('should perform a DELETE request', () => {
    const transport = createTransport();
    transport.delete('test');
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('DELETE', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith();
  });
  test('should convert data to querystring for GET requests', () => {
    const options = {
      data: {
        id: 42,
        name: 'user',
      },
    };
    const transport = createTransport();
    transport.get('test', options);
    expect(xhrMock.open).toHaveBeenCalledWith('GET', `test?${queryStringify(options.data)}`);
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith();
  });
  test('should pass object data to POST request body as a string', () => {
    const options = {
      data: {
        id: 42,
        name: 'user',
      },
    };
    const transport = createTransport();
    transport.post('test', options);
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('POST', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(options.data));
  });
  test('should pass form data to POST request body as is', () => {
    const form = new FormData();
    form.set('id', '42');
    form.set('name', 'user');
    const options = {
      data: form,
    };
    const transport = createTransport();
    transport.post('test', options);
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('POST', 'test');
    expect(xhrMock.send).toHaveBeenCalledTimes(1);
    expect(xhrMock.send).toHaveBeenCalledWith(options.data);
  });
  test('should send the request with appropriate headers', () => {
    const headers = {
      header: 'testHeader',
      anotherHeader: 'anotherTestHeader',
    };
    const options = {
      headers,
    };
    const transport = createTransport();
    transport.post('test', options);
    expect(xhrMock.open).toHaveBeenCalledTimes(1);
    expect(xhrMock.open).toHaveBeenCalledWith('POST', 'test');
    expect(xhrMock.setRequestHeader).toHaveBeenCalledTimes(2);
    expect(xhrMock.setRequestHeader).toHaveBeenNthCalledWith(1, 'header', 'testHeader');
    expect(xhrMock.setRequestHeader).toHaveBeenNthCalledWith(2, 'anotherHeader', 'anotherTestHeader');
  });
});
