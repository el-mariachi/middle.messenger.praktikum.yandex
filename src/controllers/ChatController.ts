import { getChatId } from '../store/actions';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { notificationModalButtonData } from '../constants/chatListHeader';
import Button from '../components/Button';
import {
  addUserFormInputsData,
  addUserFormButtonsData,
  deleteUserFormButtonsData,
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

const appBus = new EventBusSingl();

const notificationModalButtons = notificationModalButtonData.map((button) => new Button(button));
const notificationModalProps = {
  buttons: notificationModalButtons,
};

const addUserInputs = addUserFormInputsData.map(addInputHandlers).map(createInput);
const deleteUserInputs = addUserFormInputsData.map(addInputHandlers).map(createInput);
const addUserButtons = addUserFormButtonsData.map((button) => new Button(button));
const deleteUserButtons = deleteUserFormButtonsData.map((button) => new Button(button));

const addUserFormData = {
  formTitle: addUserFormTitle,
  inputs: addUserInputs,
  buttons: addUserButtons,
  classList: ['Modal-Form'],
  attributes: {
    name: addUserValidatorOtions.formName,
  },
  events: {
    submit: submitForm,
  },
};
const deleteUserFormData = {
  formTitle: deleteUserFormTitle,
  inputs: deleteUserInputs,
  buttons: deleteUserButtons,
  classList: ['Modal-Form'],
  attributes: {
    name: deleteUserValidatorOtions.formName,
  },
  events: {
    submit: submitForm,
  },
};

const addUserForm = new Form(addUserFormData);
const deleteUserForm = new Form(deleteUserFormData);
addUserForm.dispatchComponentDidMount();
deleteUserForm.dispatchComponentDidMount();
const addUserModalProps = { modalForm: addUserForm };
const deleteUserModalProps = { modalForm: deleteUserForm };

export class ChatController {
  constructor() {
    appBus.on(EVENTS.USER_ADD_REQUEST, this.showAddUserModal.bind(this));
    appBus.on(EVENTS.USER_DELETE_REQUEST, this.showDeleteUserModal.bind(this));
    appBus.on(EVENTS.USER_ADD, this.addUser.bind(this));
    appBus.on(EVENTS.USER_DELETE, this.deleteUser.bind(this));
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
  showAddUserModal() {
    appBus.emit(EVENTS.MODAL_SHOW_OK, addUserModalProps);
  }
  showDeleteUserModal() {
    appBus.emit(EVENTS.MODAL_SHOW_OK, deleteUserModalProps);
  }
  addUser(id: number) {
    if (this.currentChatId()) {
      //
    }
  }
  deleteUser(id: number) {
    if (this.currentChatId()) {
      //
    }
  }
}
