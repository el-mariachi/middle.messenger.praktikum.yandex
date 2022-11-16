import { LoginAPI, LoginRequest } from '../api/LoginAPI';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData } from '../constants/loginForm';
import { getFormData } from '../utils/getFormData';

const appBus = new EventBusSingl();

const loginApi = new LoginAPI();

export class LoginController {
  constructor() {
    const formName = 'login_form';
    appBus.on(EVENTS.FORM_VALID, this.login.bind(this));
    new FormValidator(inputData, { formName });
  }
  public async login(form: HTMLFormElement) {
    const data = getFormData(form) as LoginRequest;
    try {
      const user = await loginApi.request(data);
      /* eslint-disable-next-line no-console */
      console.log('LoginController received', user);
      // Router.go('/chat_list')
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log('LoginController catch', error);
    }
  }
}
