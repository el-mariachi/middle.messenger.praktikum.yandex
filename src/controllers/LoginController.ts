import { LoginAPI, LoginRequest } from '../api/LoginAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/loginForm';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import { setUser } from '../store/actions';
import { userStruct } from '../store/Store';
import { WithUserController } from '../classes/WithUserController';
import { UserController } from './UserController';

const appBus = new EventBusSingl();
const appRouter = new Router();
const loginApi = new LoginAPI();
const userController = new UserController();
export class LoginController extends WithUserController {
  static _loginController: LoginController;
  constructor(currentPath = '/') {
    const { formName } = validatorOptions;
    super(currentPath, formName);
    this.escapeRoute = '/messages';
    if (LoginController._loginController) {
      return LoginController._loginController;
    }
    appBus.on(EVENTS.FORM_VALID, this.login.bind(this));
    new FormValidator(inputData, validatorOptions);
    LoginController._loginController = this;
  }
  public async login(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data = getFormData(form) as LoginRequest;
    try {
      const { status, response } = await loginApi.request(data);
      let errorMessage;
      switch (status - (status % 100)) {
        case 200:
          userController.loadUser();
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('LoginController catch', error);
      // TODO show 500 with error ??
    }
  }
  public async logout() {
    const { status, response } = await loginApi.logout();
    if (status === 500) {
      response;
      // TODO show 500 with response ??
      return false;
    } else {
      setUser(userStruct);
      return true;
    }
  }
}
