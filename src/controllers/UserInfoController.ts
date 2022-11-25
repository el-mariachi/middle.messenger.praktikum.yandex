import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { LoginAPI } from '../api/LoginAPI';
import { FormValidator } from './FormValidator';
import { changeAvatarInputData, changeAvatarValidatorOptions, modalButtonData } from '../constants/profileForm';
import { ProfileAPI } from '../api/ProfileAPI';
import { UserController } from './UserController';
import Button from '../components/Button';
import { setUser } from '../store/actions';
import { userStruct } from '../store/Store';

const appBus = new EventBusSingl();
const loginApi = new LoginAPI();
const profileApi = new ProfileAPI();
const userController = new UserController();
const buttons = modalButtonData.map((button) => new Button(button));
const modalProps = {
  buttons,
};

export class UserInfoController extends WithUserController {
  constructor(currentPath: string) {
    const { formName } = changeAvatarValidatorOptions;
    super(currentPath, formName);
    appBus.on(EVENTS.REQUEST_LOGOUT, this.logout.bind(this));
    this.userRequired = true;
    this.escapeRoute = '/';
    new FormValidator(changeAvatarInputData, changeAvatarValidatorOptions);
    appBus.on(EVENTS.FORM_VALID, this.setAvatar.bind(this));
  }
  public async setAvatar(form: HTMLFormElement) {
    console.log('ava');
    if (form.name !== this.formName) {
      return;
    }
    const formData = new FormData(form);
    try {
      const { status, response } = await profileApi.setAvatar(formData);
      let message;
      switch (status - (status % 100)) {
        case 200:
          appBus.emit(EVENTS.MODAL_SHOW_OK, { ...modalProps, header: 'Порядок!' });
          userController.loadUser();
          break;
        case 400:
          message = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...modalProps, message, error: true });
          break;
        case 500:
          message = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, { ...modalProps, message, error: true });
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log('UserInfoController catch', error);
    }
  }
  public async logout() {
    const { status } = await loginApi.logout();
    if (status === 200) {
      setUser({ ...userStruct });
    }
  }
}
