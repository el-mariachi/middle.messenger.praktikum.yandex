import { HTTPTransport, OptionsWithoutMethod } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const chatAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

export class ChatsAPI extends BaseAPI {
  create(options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return chatAPITransport.post('/', options);
  }
  loadAll(options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return chatAPITransport.get('/', options);
  }
}
