import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { ChatsAPI } from '../api/ChatsAPI';
import { getUserState } from '../store/actions';

const appBus = new EventBusSingl();
const chatsApi = new ChatsAPI();
export class MessagesController {
  protected baseURL = 'wss://ya-praktikum.tech/ws/chats/';
  protected token = '';
  protected chatId = 0;
  protected userId: number | null = null;
  protected socket?: WebSocket;
  protected timeout?: ReturnType<typeof setTimeout>;
  constructor() {
    appBus.on(EVENTS.CHAT_SELECTED, this.setToken.bind(this));
  }
  protected async setToken(id: number) {
    this.chatId = id;
    try {
      const { status, response } = await chatsApi.getToken(id);
      switch (status - (status % 100)) {
        case 200:
          this.closeSocket();
          this.token = response.token;
          this.createSocket();
          break;
        default:
          this.token = '';
          break;
      }
    } catch (error) {
      console.log('MessagesConrtroller catch', error);
      this.token = '';
    }
  }
  protected createSocket() {
    const { id } = getUserState();
    this.userId = id;
    const socket = new WebSocket(`${this.baseURL}/${this.userId}/${this.chatId}/${this.token}`);
    if (socket) {
      this.socket = socket;
      this.addSocketLiteners();
      this.setTimeout();
    }
  }
  protected closeSocket() {
    if (!this.socket) {
      return;
    }
    this.clearTimeout();
    this.removeSocketListeners();
  }
  protected addSocketLiteners() {
    this.socket?.addEventListener('open', this.openListener.bind(this));
    this.socket?.addEventListener('close', this.closeListener.bind(this));
    this.socket?.addEventListener('message', this.messageListener.bind(this));
    this.socket?.addEventListener('error', this.errorListener.bind(this));
  }
  protected removeSocketListeners() {
    this.socket?.removeEventListener('open', this.openListener.bind(this));
    this.socket?.removeEventListener('close', this.closeListener.bind(this));
    this.socket?.removeEventListener('message', this.messageListener.bind(this));
    this.socket?.removeEventListener('error', this.errorListener.bind(this));
  }
  protected openListener() {
    console.log('socket open');
    this.socket?.send(
      JSON.stringify({
        content: `User ${this.userId} connected`,
        type: 'message',
      })
    );
  }
  protected closeListener(evt: CloseEvent) {
    if (evt.wasClean) {
      //
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${evt.code} | Причина: ${evt.reason}`);
  }
  protected messageListener(evt: MessageEvent) {
    console.log('Получено сообщение', JSON.parse(evt.data));
    // TODO update state
  }
  protected errorListener(evt: Event) {
    console.log('Ошибка сокета', evt);
  }
  protected ping() {
    this.socket?.send(
      JSON.stringify({
        content: '',
        type: 'message',
      })
    );
  }
  protected setTimeout() {
    this.timeout = setTimeout(this.ping.bind(this), 30 * 1000);
  }
  protected clearTimeout() {
    clearTimeout(this.timeout);
  }
  public loadMessages() {
    //
  }
}
