import { Block, IProps } from '../../classes/Block';
import Form from '../../components/ProfileForm';
import { logForm } from '../../utils/logForm';
import { cancelForm } from '../../utils/cancelForm';
import pageTemplate from './login.hbs';

const pageName = 'Вход';

const inputs = [
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
];

const formData = {
  formName: pageName,
  inputList: inputs,
  buttonList: buttons,
  events: {
    submit: logForm,
  },
};

const pageForm = new Form(formData);
export class Login extends Block {
  constructor(props: IProps) {
    const classList = ['Page', 'Page_type_profile'];
    super('main', { ...props, classList, pageForm });
  }
  render(): DocumentFragment {
    return this.insertChildren(pageTemplate, this.props);
  }
}

setTimeout(() => {
  /* eslint-disable-next-line no-console */
  pageForm.inputs['login'].focus();
  // pageForm.inputs['login'].hideError();
}, 10);
