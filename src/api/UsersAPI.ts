import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';
import { BASE_URL } from '../constants/api';

const usersAPITransport = new HTTPTransport(`${BASE_URL}/user`);

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
