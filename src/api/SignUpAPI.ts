import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';
import { BASE_URL } from '../constants/api';

const authAPITransport = new HTTPTransport(`${BASE_URL}/auth`);

export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class SignUpAPI extends BaseAPI {
  request(user: SignUpRequest): Promise<XMLHttpRequest> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return authAPITransport.post('/signup', { headers, data: user });
  }
  userInfo(): Promise<XMLHttpRequest> {
    // sends cookie
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    };
    return authAPITransport.get('/user', { headers });
  }
}
