import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { ChatsAPI } from '../api/ChatsAPI';
import { getUserState } from '../store/actions';
import { MessageData } from '../store/Store';
import { setMessages } from '../store/actions';
import { FormValidator } from './FormValidator';
import { newMessageInputData, newMessageValidatorOptions } from '../constants/messages';
import { getFormData } from '../utils/getFormData';
import { ChatListController } from './ChatListController';

new FormValidator([newMessageInputData], newMessageValidatorOptions);
const chatListController = new ChatListController();
const appBus = new EventBusSingl();
const chatsApi = new ChatsAPI();
export class MessagesController {
  protected baseURL = 'wss://ya-praktikum.tech/ws/chats/';
  protected token = '';
  protected chatId = 0;
  protected userId: number | null = null;
  protected socket?: WebSocket;
  protected timer?: ReturnType<typeof setTimeout>;
  protected formName: string;
  constructor() {
    this.formName = newMessageValidatorOptions.formName;
    appBus.on(EVENTS.CHAT_SELECTED, this.setToken.bind(this));
    appBus.on(EVENTS.FORM_VALID, this.sendMessage.bind(this));
  }
  protected async setToken(id: number) {
    if (id === this.chatId) {
      return;
    }
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
      /* eslint-disable-next-line no-console */
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
      this.setMessages([]);
      this.addSocketLiteners();
      this.startPing();
    }
  }
  protected closeSocket() {
    if (!this.socket) {
      return;
    }
    this.stopPing();
    this.removeSocketListeners();
    this.socket.close();
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
    this.read20Messages(0);
    this.socket?.send(
      JSON.stringify({
        type: 'message',
        content: 'Hello',
      })
    );
  }
  protected closeListener(evt: CloseEvent) {
    if (evt.wasClean) {
      //
    } else {
      /* eslint-disable-next-line no-console */
      console.log('Обрыв соединения');
    }
    /* eslint-disable-next-line no-console */
    console.log(`Код: ${evt.code} | Причина: ${evt.reason}`);
  }
  protected messageListener(evt: MessageEvent) {
    this.setMessages(JSON.parse(evt.data));
    chatListController.loadChats();
  }
  protected errorListener(evt: Event) {
    /* eslint-disable-next-line no-console */
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
  protected startPing() {
    this.timer = setInterval(this.ping.bind(this), 40 * 1000);
  }
  protected stopPing() {
    clearInterval(this.timer);
  }
  public read20Messages(offset: number) {
    const request = {
      content: String(offset),
      type: 'get old',
    };
    this.socket?.send(JSON.stringify(request));
  }
  protected setMessages(arrayOrMessage: MessageData | MessageData[]) {
    if (Array.isArray(arrayOrMessage)) {
      setMessages(arrayOrMessage.filter(this.notEmpty));
    } else {
      if (this.notEmpty(arrayOrMessage)) {
        setMessages([arrayOrMessage]);
      }
    }
  }
  protected notEmpty(message: MessageData): boolean {
    return message.content !== '';
  }
  protected sendMessage(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data = getFormData(form);
    if (!data) {
      return;
    }
    this.socket?.send(
      JSON.stringify({
        type: 'message',
        content: data.message,
      })
    );
  }
}
