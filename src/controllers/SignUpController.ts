import { SignUpAPI, SignUpRequest } from '../api/SignUpAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/signupForm';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import { WithUserController } from '../classes/WithUserController';
import { UserController } from './UserController';

const appBus = new EventBusSingl();
const appRouter = new Router();
const signUpApi = new SignUpAPI();
const userController = new UserController();

export class SignUpController extends WithUserController {
  constructor(currentPath: string) {
    const { formName } = validatorOptions;
    super(currentPath, formName);
    this.escapeRoute = '/messages';
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
          userController.loadUser();
          break;
        case 400:
          // show error message in login field
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log('SignUpController catch', error);
      appRouter.go('/500');
    }
  }
}
