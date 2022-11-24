import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const usersAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export class UsersAPI extends BaseAPI {
  search(searchString: string): Promise<XMLHttpRequest> {
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    };
    return usersAPITransport.post('/search', { headers, data: { login: searchString } });
  }
}
