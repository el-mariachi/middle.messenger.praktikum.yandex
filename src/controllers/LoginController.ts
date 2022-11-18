import { LoginAPI, LoginRequest } from '../api/LoginAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/loginForm';
import { getFormData } from '../utils/getFormData';
import { Router } from '../classes/Router';
import { setUser } from '../store/actions';
import { loadUser } from '../utils/loadUser';

const appBus = new EventBusSingl();
const appRouter = new Router();

const loginApi = new LoginAPI();

export class LoginController {
  static _loginController: LoginController;
  public formName;
  constructor(private currentPath: string) {
    if (LoginController._loginController) {
      return LoginController._loginController;
    }
    const { formName } = validatorOptions;
    this.formName = formName;
    appBus.on(EVENTS.FORM_VALID, this.login.bind(this));
    new FormValidator(inputData, validatorOptions);
    if (window.location.pathname === this.currentPath) {
      // try to load user and maybe go to '/chat_list'
      loadUser('/chat_list');
    }
    LoginController._loginController = this;
  }
  public async login(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data = getFormData(form) as LoginRequest;
    try {
      const { status, response } = await loginApi.request(data);
      let errorMessage, responseObj;
      switch (status - (status % 100)) {
        case 200:
          console.log('LoginController received', response);
          // response is just a string 'OK'
          loadUser('/chat_list');
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
      setUser(null);
      return true;
    }
  }
}
