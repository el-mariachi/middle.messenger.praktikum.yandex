import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { ChatsAPI } from '../api/ChatsAPI';
import { setChats } from '../store/actions';
import { Router } from '../classes/Router';
import {
  createChatFormInputsData,
  createChatFormButtonsData,
  createChatValidatorOtions,
} from '../constants/chatListHeader';
import Button from '../components/Button';
import addInputHandlers from '../utils/addInputHandlers';
import createInput from '../utils/createInput';
import submitForm from './submitForm';
import Form from '../components/Form';
import { setCurrentChat } from '../store/actions';
import { MODE_CHAT } from '../constants/messages';

const chatsApi = new ChatsAPI();
const appRouter = new Router();
const appBus = new EventBusSingl();
const modalInputs = createChatFormInputsData.map(addInputHandlers).map(createInput);
const modalButtons = createChatFormButtonsData.map((button) => new Button(button));
const { formName } = createChatValidatorOtions;

const formData = {
  formTitle: 'Создать чат',
  inputs: modalInputs,
  buttons: modalButtons,
  classList: ['Modal-Form'],
  attributes: {
    name: formName,
  },
  events: {
    submit: submitForm,
  },
};
const modalForm = new Form(formData);
const modalProps = { modalForm };

modalForm.dispatchComponentDidMount();
export class ChatListController extends WithUserController {
  static _chatListController: ChatListController;
  protected chatId?: number;
  constructor(currentPath = '/messages') {
    if (ChatListController._chatListController) {
      return ChatListController._chatListController;
    }
    super(currentPath);
    this.userRequired = true;
    this.escapeRoute = '/';
    this.loadChats();
    appBus.on(EVENTS.SWITCH_ROUTE, (route: string) => {
      if (route === this.currentPath) {
        this.loadChats();
      }
    });
    appBus.on(EVENTS.CHAT_CREATE_REQUEST, this.requestCreateChat.bind(this));
    appBus.on(EVENTS.CHAT_SELECTED, this.setCurrentChat.bind(this));
    ChatListController._chatListController = this;
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
      /* eslint-disable-next-line no-console */
      console.log('ChatListController catch', error);
      appRouter.go('/500');
    }
  }
  public requestCreateChat() {
    appBus.emit(EVENTS.MODAL_SHOW_OK, modalProps);
  }
  public setCurrentChat(id: number) {
    appBus.emit(EVENTS.SET_MODE_CHAT, MODE_CHAT.CHAT);
    if (id === this.chatId) {
      return;
    }
    this.chatId = id;
    setCurrentChat(id);
  }
}
