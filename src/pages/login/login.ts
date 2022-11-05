import { Block, IProps } from '../../classes/Block';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import { cancelForm } from '../../utils/cancelForm';
import pageTemplate from './login.hbs';
import { FormValidator } from '../../controllers/FormValidator';
import { FormSender } from '../../controllers/FormSender';

const pageName = 'Вход';

const inputData = [
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

const inputs = inputData.map(addInputHandlers).map(createInput);

const buttons = [
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
    attributes: {
      name: 'cancel',
      type: 'button',
      'data-url': '/up_/up_/src/pages/sign_up/sign_up.html',
    },
    text: 'Нет аккаунта?',
    classList: ['Link', 'PageLink', 'PageLink_to_login'],
    events: {
      click: cancelForm,
    },
  },
].map((button) => new Button(button.tagName, button));

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error unused var
const validator = new FormValidator(inputData, { formName: 'login_form' });
// @ts-expect-error unused var
const sender = new FormSender('login_form');
/* eslint-enable @typescript-eslint/no-unused-vars */

const formData: IProps = {
  formTitle: pageName,
  inputs,
  buttons,
  events: {
    submit: submitForm,
  },
  attributes: {
    name: 'login_form',
  },
};

const pageForm = new Form(formData);

export class LoginPage extends Block {
  constructor(props: IProps) {
    const classList = LoginPage.appendClassList(['Page', 'Page_type_profile'], props);
    super('main', { ...props, classList, pageForm });
  }
  render(): DocumentFragment {
    return this.compile(pageTemplate, this.props);
  }
}
