import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { Block } from '../classes/Block';
import { WithUserController } from '../classes/WithUserController';
import { ChatsAPI } from '../api/ChatsAPI';
import { setChats } from '../store/actions';
import { Router } from '../classes/Router';
import { modalID } from '../constants/chatListHeader';

const chatsApi = new ChatsAPI();
const appRouter = new Router();
const appBus = new EventBusSingl();

export class ChatListController extends WithUserController {
  constructor(currentPath = '/chat_list', pageModal: Block) {
    super(currentPath, 'chat_list', pageModal, modalID);
    this.userRequired = true;
    this.escapeRoute = '/';
    this.loadChats();
    appBus.on(EVENTS.CHAT_CREATE_REQUEST, this.requestCreateChat.bind(this));
  }
  public async loadChats() {
    try {
      const { status, response } = await chatsApi.loadAll({});
      switch (status - (status % 100)) {
        case 200:
          setChats(response);
          break;
        case 400:
          //
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('ChatListController catch', error);
      appRouter.go('/500');
    }
  }
  public requestCreateChat() {
    // build form and ask for chat name
    console.log('chat created');
  }
}
