import { Block } from '../classes/Block';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { LoginController } from './LoginController';
import { FormValidator } from './FormValidator';
import { changeAvatarInputData, changeAvatarValidatorOptions, modalID } from '../constants/profileForm';
import { Router } from '../classes/Router';
import { ProfileAPI } from '../api/ProfileAPI';
import { UserController } from './UserController';

const appBus = new EventBusSingl();
const appRouter = new Router();
const loginController = new LoginController();
const profileApi = new ProfileAPI();
const userController = new UserController();
export class UserInfoController extends WithUserController {
  constructor(currentPath: string, pageModal: Block) {
    const { formName } = changeAvatarValidatorOptions;
    super(currentPath, formName, pageModal, modalID);
    appBus.on(EVENTS.REQUEST_LOGOUT, this.logout.bind(this));
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
          appBus.emit(EVENTS.MODAL_SHOW_OK, 'Порядок!', this.modalID);
          userController.loadUser();
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage, this.modalID);
          break;
        case 500:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage, this.modalID);
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
