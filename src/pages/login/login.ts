import { Block, IProps } from '../../classes/Block';
import Form from '../../components/Form';
import { logForm } from '../../utils/logForm';
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
  },
  {
    name: 'password',
    label: 'Пароль',
    errorMessage: 'Пароль не подходит',
    type: 'password',
    placeholder: 'Пароль',
    accept: '',
    value: '',
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
    },
    text: 'Нет аккаунта?',
    classList: ['Link', 'PageLink', 'PageLink_to_login'],
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
  pageForm.inputs[0].focus();
}, 10);
