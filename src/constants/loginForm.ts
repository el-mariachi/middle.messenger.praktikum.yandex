import { ValidatorOptions } from '../controllers/FormValidator';

export const inputData = [
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
    name: 'password',
    label: 'Пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Пароль',
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
      value: 'Войти',
    },
    classList: ['Submit', 'Form-Submit'],
  },
  {
    tagName: 'a',
    attributes: {
      name: 'cancel',
      type: 'button',
      href: '/sign_up',
    },
    text: 'Нет аккаунта?',
    classList: ['Link', 'PageLink', 'PageLink_to_login'],
  },
];

export const validatorOptions: ValidatorOptions = {
  formName: 'login_form',
};
