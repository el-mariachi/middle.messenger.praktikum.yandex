import Page, { IProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './login.hbs';
import { inputData, buttonsData } from '../../constants/loginForm';
import { LoginController } from '../../controllers/LoginController';
import { checkUserState } from '../../store/checkUserState';

const currentPath = '/';
if (window.location.pathname === currentPath) {
  checkUserState('/chat_list'); // if Store has user, go to chat_list
}
const pageName = 'Вход';
const inputs = inputData.map(addInputHandlers).map(createInput);
const buttons = buttonsData.map((button) => new Button(button));

new LoginController(currentPath);

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

export class LoginPage extends Page {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = LoginPage.appendClassList(['Page', 'Page_type_profile'], props);
    super({ ...props, tagName, classList, pageForm });
  }
  render(): DocumentFragment {
    this.setPageTitle('Login');
    return this.compile(pageTemplate, this.props);
  }
}
