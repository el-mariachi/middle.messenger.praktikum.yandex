import { hideModal } from '../utils/hideModal';

export enum MODE {
  LIST,
  CHAT,
}

const addUserFormInputsData = [
  {
    name: 'userId',
    id: 'userId',
    label: 'ID пользователя',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Введите ID пользователя',
    accept: '',
    value: '',
    test: /^\d+$/,
  },
];

const addUserFormButtonsData = [
  {
    tagName: 'input',
    attributes: {
      type: 'submit',
      name: 'submit',
      value: 'Добавить',
    },
    text: 'Добавить',
    classList: ['Modal-Button', 'Modal_type_ok'],
    events: {
      click: hideModal,
    },
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Отменить!',
    classList: ['Modal-Button', 'Modal_type_cancel'],
    events: {
      click: hideModal,
    },
  },
];
const deleteUserFormButtonsData = [
  {
    tagName: 'input',
    attributes: {
      type: 'submit',
      name: 'submit',
      value: 'Удалить',
    },
    text: 'Удалить',
    classList: ['Modal-Button', 'Modal_type_ok'],
    events: {
      click: hideModal,
    },
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Отменить!',
    classList: ['Modal-Button', 'Modal_type_cancel'],
    events: {
      click: hideModal,
    },
  },
];

const addUserValidatorOtions = {
  formName: 'add_user',
};
const deleteUserValidatorOtions = {
  formName: 'delete_user',
};
const addUserFormTitle = 'Добавить пользователя';
const deleteUserFormTitle = 'Удалить пользователя';

export {
  addUserFormInputsData,
  addUserFormButtonsData,
  deleteUserFormButtonsData,
  addUserValidatorOtions,
  deleteUserValidatorOtions,
  addUserFormTitle,
  deleteUserFormTitle,
};
