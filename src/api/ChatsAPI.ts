import { HTTPTransport, OptionsWithoutMethod } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';

const chatAPITransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

export type CreateChatRequest = {
  title: string;
};

const headers = {
  'Content-Type': 'application/json',
};
export class ChatsAPI extends BaseAPI {
  create(chat: CreateChatRequest): Promise<XMLHttpRequest> {
    return chatAPITransport.post('/', { data: chat });
  }
  loadAll(options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return chatAPITransport.get('/', options);
  }
}
