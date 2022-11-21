import { Block, IProps } from '../classes/Block';
import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { LoginController } from './LoginController';
import { FormValidator } from './FormValidator';
import { changeAvatarInputData, changeAvatarValidatorOptions, avatarModalButtonData } from '../constants/profileForm';
import { Router } from '../classes/Router';
import { ProfileAPI } from '../api/ProfileAPI';
import { UserController } from './UserController';
import Button from '../components/Button';

const appBus = new EventBusSingl();
const appRouter = new Router();
const loginController = new LoginController();
const profileApi = new ProfileAPI();
const userController = new UserController();
const avatarModalButtons = avatarModalButtonData.map((button) => new Button(button));
export class UserInfoController extends WithUserController {
  public formName;
  constructor(currentPath: string, private pageModal: Block) {
    super(currentPath);
    appBus.on(EVENTS.REQUEST_LOGOUT, this.logout.bind(this));
    const { formName } = changeAvatarValidatorOptions;
    this.formName = formName;
    this.userRequired = true;
    this.escapeRoute = '/';
    new FormValidator(changeAvatarInputData, changeAvatarValidatorOptions);
    appBus.on(EVENTS.FORM_VALID, this.setAvatar.bind(this));
    appBus.on(EVENTS.MODAL_SHOW_OK, this.showModalOK.bind(this));
    appBus.on(EVENTS.MODAL_SHOW_ERROR, this.showModalError.bind(this));
    appBus.on(EVENTS.MODAL_HIDE, this.hideModal.bind(this));
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
          appBus.emit(EVENTS.MODAL_SHOW_OK, 'Порядок!');
          userController.loadUser();
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage);
          break;
        case 500:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage);
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
  public showModalOK(message: string) {
    const modalProps = { header: message, buttons: avatarModalButtons, error: false };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public showModalError(message: string) {
    const modalProps = { header: 'Ошибка!', message, buttons: avatarModalButtons, error: true };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public hideModal() {
    this.pageModal.hide();
  }
}
