import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const authAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export type LoginRequest = {
  login: string;
  password: string;
};

export class LoginAPI extends BaseAPI {
  request(user: LoginRequest): Promise<XMLHttpRequest> {
    return authAPITransport.post('/signin', { data: user }).then((response) => response);
  }
}
