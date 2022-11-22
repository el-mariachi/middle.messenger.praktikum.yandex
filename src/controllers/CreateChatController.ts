import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import {
  createChatFormInputsData,
  createChatValidatorOtions,
  notificationModalButtonData,
} from '../constants/chatListHeader';
import { ChatsAPI, CreateChatRequest } from '../api/ChatsAPI';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import Button from '../components/Button';
import { ChatListController } from './ChatListController';

const chatListController = new ChatListController();
const appBus = new EventBusSingl();
const appRouter = new Router();
const chatsAPI = new ChatsAPI();
const buttons = notificationModalButtonData.map((button) => new Button(button));
const modalProps = {
  buttons,
};
export class CreateChatController {
  protected formName;
  constructor(protected currentPath: string) {
    const { formName } = createChatValidatorOtions;
    this.formName = formName;
    appBus.on(EVENTS.FORM_VALID, this.createChat.bind(this));
    new FormValidator(createChatFormInputsData, createChatValidatorOtions);
  }
  public async createChat(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data = getFormData(form) as CreateChatRequest;
    // return;
    try {
      const { status, response } = await chatsAPI.create(data);
      let message;
      switch (status - (status % 100)) {
        case 200:
          console.log(response);
          chatListController.loadChats();
          break;
        case 400:
          message = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...modalProps, message, error: true });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('CreateChatController catch', error);
      appRouter.go('/500');
    }
  }
}
