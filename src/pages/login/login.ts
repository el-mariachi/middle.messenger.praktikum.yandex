import { Block } from '../../classes/Block';
import Form, { IFormProps } from '../../components/Form';
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

const pageForm = new Form({ inputList: inputs, formName: pageName });
export class Login extends Block {
  constructor(props: IFormProps) {
    const classList = ['Page', 'Page_type_profile'];
    super('main', { ...props, classList, pageForm });
  }
  render(): DocumentFragment {
    return this.insertChildren(pageTemplate, this.props);
  }
}
