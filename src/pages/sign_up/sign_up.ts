import Page, { IProps, PageProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './sign_up.hbs';
import { inputData, buttonsData } from '../../constants/signupForm';
import { SignUpController } from '../../controllers/SignUpController';
import { checkUserState } from '../../store/checkUserState';

function createPageResources(currentPath: string) {
  // will get called in page constructor
  const pageName = 'Регистрация';
  const inputs = inputData.map(addInputHandlers).map(createInput);
  const buttons = buttonsData.map((button) => new Button(button));

  new SignUpController(currentPath);

  const formData: IProps = {
    formTitle: pageName,
    inputs,
    buttons,
    events: {
      submit: submitForm,
    },
    attributes: {
      name: 'sign_up_form',
    },
  };

  const pageForm = new Form(formData);
  return { pageForm };
}

// const currentPath = '/sign_up';
// if (window.location.pathname === currentPath) {
//   checkUserState('/chat_list'); // if Store has user, go to chat_list
// }

export class SignUpPage extends Page {
  constructor(props: PageProps) {
    // set up root element
    const tagName = 'main';
    const classList = SignUpPage.appendClassList(['Page', 'Page_type_profile'], props);
    // set up children
    const { pageForm } = createPageResources(props.currentPath);
    super({ ...props, tagName, classList, pageForm });
  }
  render(): DocumentFragment {
    this.setPageTitle('Sign Up');
    return this.compile(pageTemplate, this.props);
  }
}
