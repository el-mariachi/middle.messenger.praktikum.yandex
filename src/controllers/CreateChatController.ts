import { Modal } from '../components/Modal/Modal';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import {
  createChatFormInputsData,
  createChatValidatorOtions,
  notificationModalButtonData,
  modalID,
} from '../constants/chatListHeader';
import { ChatsAPI, CreateChatRequest } from '../api/ChatsAPI';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import Button from '../components/Button';

const appBus = new EventBusSingl();
const appRouter = new Router();
const chatsAPI = new ChatsAPI();
// to use the same modal create its contents call setProps()
const modalButtons = notificationModalButtonData.map((button) => new Button(button));

export class CreateChatController {
  protected formName;
  constructor(protected currentPath: string, protected pageModal: Modal) {
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
      let errorMessage, modalProps;
      switch (status - (status % 100)) {
        case 200:
          console.log(response);
          // update store
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          this.pageModal.reset();
          modalProps = {
            modalID,
            header: 'Ошибка!',
            message: errorMessage,
            buttons: modalButtons,
            error: true,
          };
          this.pageModal.setProps(modalProps);
          this.pageModal.show();
          // appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
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
