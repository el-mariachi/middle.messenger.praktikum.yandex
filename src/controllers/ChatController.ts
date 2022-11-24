import { getChatId } from '../store/actions';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { notificationModalButtonData } from '../constants/chatListHeader';
import Button from '../components/Button';
import {
  addUserFormInputsData,
  addUserModalButtonsData,
  addUserValidatorOtions,
  deleteUserValidatorOtions,
  addUserFormTitle,
  deleteUserFormTitle,
} from '../constants/messages';

import addInputHandlers from '../utils/addInputHandlers';
import createInput from '../utils/createInput';
import submitForm from './submitForm';
import Form from '../components/Form';
import { FormValidator } from './FormValidator';
import UserSelect from '../components/UserSelect';
import userSelector from '../utils/userSelector';
import { getFormData } from '../utils/getFormData';
import { UserController } from './UserController';
import { ChatsAPI } from '../api/ChatsAPI';
import userSearch from '../utils/userSearch';
import { setUserList } from '../store/actions';
import { userStruct } from '../store/Store';

const userController = new UserController();
const appBus = new EventBusSingl();
const chatsApi = new ChatsAPI();

const notificationModalButtons = notificationModalButtonData.map((button) => new Button(button));
const notificationModalProps = {
  buttons: notificationModalButtons,
};

const addUserInputs = addUserFormInputsData.map(addInputHandlers).map(createInput);
// const deleteUserInputs = addUserFormInputsData.map(addInputHandlers).map(createInput);
const addUserButtons = addUserModalButtonsData.map((button) => new Button(button));
const deleteUserButtons = addUserModalButtonsData.map((button) => new Button(button));

const addUserFormData = {
  formTitle: addUserFormTitle,
  inputs: addUserInputs,
  // buttons: addUserButtons,
  classList: ['Modal-Form'],
  attributes: {
    name: addUserValidatorOtions.formName,
  },
  events: {
    submit: submitForm,
  },
};
// const deleteUserFormData = {
//   formTitle: deleteUserFormTitle,
//   inputs: deleteUserInputs,
//   // buttons: deleteUserButtons,
//   classList: ['Modal-Form'],
//   attributes: {
//     name: deleteUserValidatorOtions.formName,
//   },
//   events: {
//     submit: submitForm,
//   },
// };

const userSelect = new UserSelect({
  events: {
    click: userSelector,
  },
});

const addUserForm = new Form(addUserFormData);
// const deleteUserForm = new Form(deleteUserFormData);

const addUserModalInput = addUserForm.getContent().querySelector('input.Input') as HTMLInputElement;
if (addUserModalInput) {
  addUserModalInput.addEventListener('input', userSearch);
}
// const deleteUserModalInput = deleteUserForm.getContent().querySelector('input.Input') as HTMLInputElement;
// if (deleteUserModalInput) {
//   deleteUserModalInput.addEventListener('input', userSearch);
// }
const addUserModalProps = { modalForm: addUserForm, content: userSelect, buttons: addUserButtons };
const deleteUserModalProps = { header: deleteUserFormTitle, content: userSelect, buttons: deleteUserButtons };

export class ChatController {
  constructor() {
    appBus.on(EVENTS.USER_ADD_REQUEST, this.showAddUserModal.bind(this));
    appBus.on(EVENTS.USER_DELETE_REQUEST, this.showDeleteUserModal.bind(this));
    appBus.on(EVENTS.USER_ADD, this.addUser.bind(this));
    appBus.on(EVENTS.USER_DELETE, this.deleteUser.bind(this));
    appBus.on(EVENTS.FORM_SUBMIT, this.filterForm.bind(this));
    new FormValidator(addUserFormInputsData, addUserValidatorOtions);
    new FormValidator(addUserFormInputsData, deleteUserValidatorOtions);
  }
  currentChatId() {
    const chatId = getChatId();
    if (!chatId) {
      appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...notificationModalProps, message: 'Чат не выбран', error: true });
    }
    return chatId;
  }
  filterForm(form: HTMLFormElement) {
    const data = getFormData(form) as { userLogin: string };
    if (form.name === 'add_user') {
      const { userLogin } = data;
      this.userSearch(userLogin);
    }
  }
  userSearch(searchString: string) {
    if (!this.currentChatId()) {
      return;
    }
    userController.search(searchString);
  }
  async usersForChat() {
    const chatId = this.currentChatId();
    if (chatId) {
      try {
        const { status, response } = await chatsApi.getUsers(chatId);
        switch (status - (status % 100)) {
          case 200:
            setUserList(response);
            break;
          default:
            setUserList([Object.assign(userStruct, { login: 'Нет подходящих пользователей' })]);
            break;
        }
      } catch (error) {
        console.log('ChatController catch', error);
      }
    }
  }
  showAddUserModal() {
    this.userSearch('');
    userSelect.setProps({ event: EVENTS.USER_ADD });
    appBus.emit(EVENTS.MODAL_SHOW_OK, addUserModalProps);
  }
  showDeleteUserModal() {
    this.usersForChat();
    userSelect.setProps({ event: EVENTS.USER_DELETE });
    appBus.emit(EVENTS.MODAL_SHOW_OK, deleteUserModalProps);
  }
  async addUser(id: number) {
    appBus.emit(EVENTS.MODAL_HIDE);
    const chatId = this.currentChatId();
    if (chatId) {
      const data = { users: [id], chatId };
      let message;
      try {
        const { status, response } = await chatsApi.addUsers(data);
        switch (status - (status % 100)) {
          case 200:
            // update chats ??
            break;
          default:
            message = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
            appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...notificationModalProps, message, error: true });
            break;
        }
      } catch (error) {
        console.log('ChatController catch', error);
      }
    }
  }
  async deleteUser(id: number) {
    appBus.emit(EVENTS.MODAL_HIDE);
    const chatId = this.currentChatId();
    if (chatId) {
      const data = { users: [id], chatId };
      let message;
      try {
        const { status, response } = await chatsApi.deleteUsers(data);
        switch (status - (status % 100)) {
          case 200:
            // update chats ??
            break;
          default:
            message = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
            appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...notificationModalProps, message, error: true });
            break;
        }
      } catch (error) {
        console.log('ChatController catch', error);
      }
    }
  }
}
