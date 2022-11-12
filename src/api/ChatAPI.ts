import { HTTPTransport, OptionsWithoutMethod } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const chatAPITransport = new HTTPTransport('api/v1/chats');

export class ChatAPI extends BaseAPI {
  create(options: OptionsWithoutMethod) {
    return chatAPITransport.post('/', options);
  }
  request(options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return chatAPITransport.get('/', options);
  }
}
