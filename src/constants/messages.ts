import { hideModal } from '../utils/hideModal';
import { InputProps } from '../components/InputGroup';
import { ValidatorOptions } from '../controllers/FormValidator';
// import userSearch from '../utils/userSearch';

export enum MODE_CHAT {
  LIST,
  CHAT,
}

const addUserFormInputsData: InputProps[] = [
  {
    name: 'userLogin',
    id: 'userLogin',
    label: 'Логин пользователя',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Введите логин пользователя',
    accept: '',
    value: '',
    test: /^.+$/,
    // events: {
    //   input: userSearch,
    // },
  },
];

const addUserModalButtonsData = [
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

const addUserValidatorOtions: ValidatorOptions = {
  formName: 'add_user',
};
const deleteUserValidatorOtions: ValidatorOptions = {
  formName: 'delete_user',
};
const addUserFormTitle = 'Добавить пользователя';
const deleteUserFormTitle = 'Удалить пользователя';

const newMessageInputData: InputProps = {
  classList: ['NewMessage', 'Input_theme_grey'],
  type: 'text',
  name: 'message',
  placeholder: 'Сообщение',
  test: /.+/,
};

const sendMessageButtonData = {
  attributes: {
    type: 'submit',
  },
  classList: ['Send', 'Compose-Send', 'Icon', 'Icon_type_send'],
};

const newMessageValidatorOptions: ValidatorOptions = {
  formName: 'compose_form',
};

export {
  addUserFormInputsData,
  addUserModalButtonsData,
  addUserValidatorOtions,
  deleteUserValidatorOtions,
  addUserFormTitle,
  deleteUserFormTitle,
  newMessageInputData,
  sendMessageButtonData,
  newMessageValidatorOptions,
};
