import { HTTPTransport, OptionsWithoutMethod } from '../utils/HTTPTransport';
import { BaseAPI } from '../classes/BaseAPI';
import { BASE_URL } from '../constants/api';

const chatAPITransport = new HTTPTransport(`${BASE_URL}/chats`);

export type CreateChatRequest = {
  title: string;
};

export type AddUsersRequest = {
  users: number[];
  chatId: number;
};

const headers = {
  'Content-Type': 'application/json',
};
export class ChatsAPI extends BaseAPI {
  create(chat: CreateChatRequest): Promise<XMLHttpRequest> {
    return chatAPITransport.post('/', { headers, data: chat });
  }
  loadAll(options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return chatAPITransport.get('/', options);
  }
  getUsers(chatId: number): Promise<XMLHttpRequest> {
    return chatAPITransport.get(`/${chatId}/users`);
  }
  getToken(chatId: number): Promise<XMLHttpRequest> {
    return chatAPITransport.post(`/token/${chatId}`);
  }
  addUsers(data: AddUsersRequest): Promise<XMLHttpRequest> {
    return chatAPITransport.put('/users', { headers, data });
  }
  deleteUsers(data: AddUsersRequest): Promise<XMLHttpRequest> {
    return chatAPITransport.delete('/users', { headers, data });
  }
}
