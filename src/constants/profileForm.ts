import { ValidatorOptions } from '../controllers/FormValidator';
import { goToURL } from '../utils/goToURL';
import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from './events';
const appBus = new EventBusSingl();

export enum MODE {
  INFO,
  UPDATE,
  PASSWORD,
}

const changeAvatarInputData = [
  {
    name: 'avatar',
    type: 'file',
    placeholder: '',
    test: /.+/,
  },
];

const userInfoInputData = [
  {
    name: 'first_name',
    label: 'Имя',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Имя',
    accept: '',
    value: '',
    test: /^([A-Z][A-Za-z-]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Фамилия',
    accept: '',
    value: '',
    test: /^([A-Z][A-Za-z]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'display_name',
    label: 'Ник',
    errorMessage: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Ник',
    accept: '',
    value: '',
    test: /^([A-Za-z]+$)|([А-Яа-я-]+$)/,
  },
  {
    name: 'login',
    label: 'Логин',
    errorMessage: 'Неверный логин',
    type: 'text',
    placeholder: 'Логин',
    accept: '',
    value: '',
    test: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
  },
  {
    name: 'email',
    label: 'Email',
    errorMessage: 'Некорректный email',
    type: 'email',
    placeholder: 'Email',
    accept: '',
    value: '',
    test: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  {
    name: 'phone',
    label: 'Телефон',
    errorMessage: 'Некорректный телефон',
    type: 'text',
    placeholder: 'Телефон',
    accept: '',
    value: '',
    test: /^\+?\d{10,15}$/i,
  },
];

const changePasswordInputData = [
  {
    name: 'newPassword',
    label: 'Новый пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Новый пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'newPassword2',
    label: 'Повторите пароль',
    errorMessage: 'Пароли не совпадают',
    type: 'password',
    placeholder: 'Повторите пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Старый пароль',
    accept: '',
    value: '',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
];

const userInfoButtonsData = [
  {
    attributes: {
      type: 'button',
    },
    text: 'Редактировать профиль',
    classList: ['Link', 'FormLink'],
    events: {
      click: () => {
        appBus.emit(EVENTS.SET_MODE, MODE.UPDATE);
      },
    },
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Изменить пароль',
    classList: ['Link', 'FormLink'],
    events: {
      click: () => {
        appBus.emit(EVENTS.SET_MODE, MODE.PASSWORD);
      },
    },
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Сменить аккаунт',
    classList: ['Link', 'FormLink', 'PageLink_to_logout'],
    events: {
      click: () => {
        appBus.emit(EVENTS.REQUEST_LOGOUT);
      },
    },
  },
];

const updateProfileButtonsData = [
  {
    tagName: 'input',
    attributes: {
      type: 'submit',
      name: 'submit',
      value: 'Сохранить',
    },
    classList: ['Submit', 'Form-Submit'],
  },
  {
    attributes: {
      type: 'button',
    },
    text: 'Отменить',
    classList: ['Link', 'PageLink', 'PageLink_to_login'],
    events: {
      click: () => {
        appBus.emit(EVENTS.SET_MODE, MODE.INFO);
      },
    },
  },
];

const chatListLinkData = {
  text: 'Назад к чатам',
  classList: ['PageLink', 'PageLink_to_list', 'Profile-PageLink'],
  attributes: {
    href: '/chat_list',
  },
  events: {
    click: (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target) {
        goToURL.call(target);
      }
    },
  },
};

const changeAvatarValidatorOptions: ValidatorOptions = {
  formName: 'user_info_form',
};

const updateProfileValidatorOptions: ValidatorOptions = {
  formName: 'update_profile_form',
};

const changePasswordValidatorOptions: ValidatorOptions = {
  formName: 'change_password_form',
  password: {
    source: 'newPassword',
    target: 'newPassword2',
  },
};

const avatarInputProps = {
  events: {}, // triggers addEvents() in component
  editable: true,
  imageLoadHandler: (e: Event) => {
    const target = e.target as HTMLInputElement;
    appBus.emit(EVENTS.FORM_SUBMIT, target.form);
  },
};

const avatarModalButtonData = [
  {
    attributes: {
      type: 'button',
    },
    text: 'Принято!',
    classList: ['Modal-Button', 'Modal_type_ok'],
    events: {
      click: (e: Event) => {
        const target = e.target as HTMLButtonElement;
        const container = target.closest('div.Modal-Dialog') as HTMLDivElement;
        let formName;
        if (container) {
          formName = container.dataset.formName;
        }
        appBus.emit(EVENTS.MODAL_HIDE, formName);
      },
    },
  },
];

export {
  changeAvatarInputData,
  userInfoInputData,
  changePasswordInputData,
  userInfoButtonsData,
  updateProfileButtonsData,
  chatListLinkData,
  changeAvatarValidatorOptions,
  updateProfileValidatorOptions,
  changePasswordValidatorOptions,
  avatarInputProps,
  avatarModalButtonData,
};
