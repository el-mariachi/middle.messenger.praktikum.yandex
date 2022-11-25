import { hideModal } from '../utils/hideModal';
// import userSearch from '../utils/userSearch';

export enum MODE {
  LIST,
  CHAT,
}

const addUserFormInputsData = [
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
  addUserModalButtonsData,
  addUserValidatorOtions,
  deleteUserValidatorOtions,
  addUserFormTitle,
  deleteUserFormTitle,
};
