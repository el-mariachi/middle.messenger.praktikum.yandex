import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { Block } from '../classes/Block';
import { WithUserController } from '../classes/WithUserController';
import { ChatsAPI } from '../api/ChatsAPI';
import { setChats } from '../store/actions';
import { Router } from '../classes/Router';
import { modalID, createChatFormInputsData, createChatFormButtonsData } from '../constants/chatListHeader';
import Button from '../components/Button';
import createInput from '../utils/createInput';
import submitForm from './submitForm';
import Form from '../components/Form';

const chatsApi = new ChatsAPI();
const appRouter = new Router();
const appBus = new EventBusSingl();
const modalInputs = createChatFormInputsData.map(createInput);
const modalButtons = createChatFormButtonsData.map((button) => new Button(button));
const formData = {
  formTitle: 'Создать чат',
  inputs: modalInputs,
  buttons: modalButtons,
  classList: ['Modal-Form'],
  attributes: {
    name: 'create_chat',
  },
  events: {
    submit: submitForm,
  },
};
const modalForm = new Form(formData);
modalForm.dispatchComponentDidMount();
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
    const modalProps = { modalID: this.modalID, modalForm };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
}
