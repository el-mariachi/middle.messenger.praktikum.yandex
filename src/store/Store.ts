import { EventBus } from '../controllers/EventBusExt';
import { EVENTS } from '../constants/events';
import set from '../utils/set';

export type UserData = {
  id: number | null;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export const userStruct: UserData = Object.freeze({
  id: null,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
});

export type ChatData = {
  id: number;
  title: string;
  created_by: number;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: UserData;
    time: string;
    content: string;
  } | null;
};

export const chatStruct: ChatData = {
  id: 0,
  title: 'Чат не выбран',
  created_by: 0,
  avatar: null,
  unread_count: 0,
  last_message: null,
};

export type MessageType = 'user_connected' | 'message' | 'file';

export type MessageData = {
  id: number;
  user_id: number;
  chat_id: number;
  type: MessageType;
  time: string;
  content: string | number;
  file?: File;
};

export type State = {
  user: UserData;
  chatsData: ChatData[];
  currentChat: number | null;
  userList: UserData[] | [];
  messagesData: MessageData[] | [];
};

class Store extends EventBus {
  private _state: State = {
    user: { ...userStruct },
    chatsData: [],
    currentChat: null,
    userList: [],
    messagesData: [],
  };

  public getState() {
    return this._state;
  }
  public set(path: string, value: unknown): void {
    set(this._state, path, value);
    this.emit(EVENTS.STORE_UPDATED);
  }
}

export default new Store();
