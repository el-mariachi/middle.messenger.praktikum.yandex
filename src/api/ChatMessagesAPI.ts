import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const chatMessagesAPITransport = new HTTPTransport('api/v1/chats');

export class ChatAPI extends BaseAPI {
  request({ id }: { id: string }): Promise<XMLHttpRequest> {
    return chatMessagesAPITransport.get(`/${id}`);
  }
}
