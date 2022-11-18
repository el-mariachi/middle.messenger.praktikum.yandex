import { ValidatorOptions } from '../controllers/FormValidator';
import { goToURL } from '../utils/goToURL';
import { LoginController } from '../controllers/LoginController';

const loginController = new LoginController();

export const inputData = [
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

export const buttonsData = [
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
      'data-url': '/',
    },
    text: 'Сменить аккаунт',
    classList: ['Link', 'PageLink', 'PageLink_to_login'],
    events: {
      click: (e: Event) => {
        const target = e.target as HTMLElement;
        loginController.logout().then((result) => {
          if (result) {
            goToURL.call(target);
          }
        });
      },
    },
  },
];

export const chatListLinkData = {
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

export const validatorOptions: ValidatorOptions = {
  formName: 'edit_profile_form',
  password: {
    source: 'newPassword',
    target: 'newPassword2',
  },
};