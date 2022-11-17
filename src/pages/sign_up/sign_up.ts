import Page, { IProps } from '../../components/Page';
import Form from '../../components/ProfileForm';
import addInputHandlers from '../../utils/addInputHandlers';
import createInput from '../../utils/createInput';
import Button from '../../components/Button';
import submitForm from '../../controllers/submitForm';
import pageTemplate from './sign_up.hbs';
// import { FormValidator, ValidatorOptions } from '../../controllers/FormValidator';
// import { FormSender } from '../../controllers/FormSender';
import { inputData, buttonsData } from '../../constants/signupForm';
import { SignUpController } from '../../controllers/SignUpController';

const pageName = 'Регистрация';

const inputs = inputData.map(addInputHandlers).map(createInput);
const buttons = buttonsData.map((button) => new Button(button));

new SignUpController();

// const validatorOptions: ValidatorOptions = {
//   formName: 'sign_up_form',
//   password: {
//     source: 'password',
//     target: 'password2',
//   },
// };
/* eslint-disable @typescript-eslint/no-unused-vars */
//// @ts-expect-error unused var
// const validator = new FormValidator(inputData, validatorOptions);
//// @ts-expect-error unused var
// const sender = new FormSender('sign_up_form');
/* eslint-enable @typescript-eslint/no-unused-vars */

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

export class SignUpPage extends Page {
  constructor(props: IProps) {
    const tagName = 'main';
    const classList = SignUpPage.appendClassList(['Page', 'Page_type_profile'], props);
    super({ ...props, tagName, classList, pageForm });
  }
  render(): DocumentFragment {
    this.setPageTitle('Sign Up');
    return this.compile(pageTemplate, this.props);
  }
}
