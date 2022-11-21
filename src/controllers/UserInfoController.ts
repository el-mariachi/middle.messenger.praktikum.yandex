import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { LoginController } from './LoginController';
import { FormValidator } from './FormValidator';
import { changeAvatarInputData, changeAvatarValidatorOptions } from '../constants/profileForm';
import { Router } from '../classes/Router';
import { ProfileAPI } from '../api/ProfileAPI';
import { UserController } from './UserController';

const appBus = new EventBusSingl();
const appRouter = new Router();
const loginController = new LoginController();
const profileApi = new ProfileAPI();
const userController = new UserController();

export class UserInfoController extends WithUserController {
  public formName;
  constructor(currentPath: string) {
    super(currentPath);
    appBus.on(EVENTS.REQUEST_LOGOUT, this.logout.bind(this));
    const { formName } = changeAvatarValidatorOptions;
    this.formName = formName;
    this.userRequired = true;
    this.escapeRoute = '/';
    new FormValidator(changeAvatarInputData, changeAvatarValidatorOptions);
    appBus.on(EVENTS.FORM_VALID, this.setAvatar.bind(this));
  }
  public async setAvatar(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const formData = new FormData(form);
    try {
      const { status, response } = await profileApi.setAvatar(formData);
      let errorMessage;
      switch (status - (status % 100)) {
        case 200:
          appBus.emit(EVENTS.SHOW_MODAL_OK, 'Порядок!');
          userController.loadUser();
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.SHOW_MODAL_ERROR, errorMessage);
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('UserInfoController catch', error);
      // TODO show 500 with error ??
    }
  }
  public async logout() {
    const success = await loginController.logout();
    if (success) {
      appRouter.go(this.escapeRoute);
    }
  }
}
