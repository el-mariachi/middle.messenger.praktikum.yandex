import Page, { IProps, PageProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './login.hbs';
import { inputData, buttonsData } from '../../constants/loginForm';
import { LoginController } from '../../controllers/LoginController';

function createPageResources(currentPath: string) {
  // will get called in page constructor
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
  return { pageForm };
}

export class LoginPage extends Page {
  constructor(props: PageProps) {
    // set up root element
    const tagName = 'main';
    const classList = LoginPage.appendClassList(['Page', 'Page_type_profile'], props);
    // set up children
    const { pageForm } = createPageResources(props.currentPath);
    super({ ...props, tagName, classList, pageForm });
  }
  render(): DocumentFragment {
    this.setPageTitle('Login');
    return this.compile(pageTemplate, this.props);
  }
}
