import { SignUpAPI, SignUpRequest } from '../api/SignUpAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/signupForm';
import { getFormData } from '../utils/getFormData';
import { UserController } from './UserController';
import { Router } from '../classes/Router';

const appBus = new EventBusSingl();
const appRouter = new Router();
const signUpApi = new SignUpAPI();
const userController = new UserController();

export class SignUpController {
  public formName;
  constructor() {
    const { formName } = validatorOptions;
    this.formName = formName;
    appBus.on(EVENTS.FORM_VALID, this.signup.bind(this));
    new FormValidator(inputData, validatorOptions);
  }
  public async signup(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data: SignUpRequest = getFormData(form) as SignUpRequest;
    let errorMessage;
    try {
      const { status, response } = await signUpApi.request(data);
      switch (status - (status % 100)) {
        case 200:
          console.log('SignUpController received', response);
          userController.loadUser();
          break;
        case 400:
          if (status === 401) {
            console.log('unauthorized');
          }
          // show error message in login field
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('LoginController catch', error);
      appRouter.go('/500');
    }
  }
}
