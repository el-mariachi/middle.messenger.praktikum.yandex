import { LoginAPI, LoginRequest } from '../api/LoginAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/loginForm';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import { UserController } from './UserController';

const appBus = new EventBusSingl();
const appRouter = new Router();
const userController = new UserController();

const loginApi = new LoginAPI();

export class LoginController {
  public formName;
  constructor() {
    const { formName } = validatorOptions;
    this.formName = formName;
    appBus.on(EVENTS.FORM_VALID, this.login.bind(this));
    new FormValidator(inputData, validatorOptions);
  }
  public async login(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data = getFormData(form) as LoginRequest;
    try {
      const loggedOut = await this.logout();
      if (!loggedOut) {
        throw new Error('Failed to log out user');
      }
      const { status, response } = await loginApi.request(data);
      let errorMessage, responseObj;
      switch (status - (status % 100)) {
        case 200:
          console.log('LoginController received', response);
          userController.loadUser();
          appRouter.go('/chat_list');
          break;
        case 400:
          if (status === 401) {
            console.log('unauthorized');
          }
          // show error message in login field
          responseObj = JSON.parse(response);

          errorMessage =
            responseObj.reason && typeof responseObj.reason === 'string' ? responseObj.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
      /* eslint-disable-next-line no-console */
      // Router.go('/chat_list')
    } catch (error) {
      console.log('LoginController catch', error);
      // show 500 page
    }
  }
  public async logout() {
    const { status, response } = await loginApi.logout();
    if (status === 500) {
      console.log(response);
      return false;
    } else {
      return true;
    }
  }
}
