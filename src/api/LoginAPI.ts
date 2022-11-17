import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const authAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export type LoginRequest = {
  login: string;
  password: string;
};

const headers = {
  'Content-Type': 'application/json',
};
export class LoginAPI extends BaseAPI {
  request(user: LoginRequest): Promise<XMLHttpRequest> {
    return authAPITransport.post('/signin', { headers, data: user }).then((response) => response);
  }
  logout() {
    return authAPITransport.post('/logout').then((response) => response);
  }
}
