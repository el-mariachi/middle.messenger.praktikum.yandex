import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import {
  changePasswordInputData,
  changePasswordValidatorOptions,
  MODE,
  modalButtonData,
} from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, ChangePasswordRequest } from '../api/ProfileAPI';
import { Router } from '../classes/Router';
import Button from '../components/Button';

const appBus = new EventBusSingl();
const appRouter = new Router();
const profileAPI = new ProfileAPI();
const buttons = modalButtonData.map((button) => new Button(button));
const modalProps = {
  buttons,
};

export class ChangePasswordController extends WithUserController {
  constructor(currentPath: string) {
    const { formName } = changePasswordValidatorOptions;
    super(currentPath, formName);
    this.userRequired = true;
    this.escapeRoute = '/';
    appBus.on(EVENTS.FORM_VALID, this.changePassword.bind(this));
    new FormValidator(changePasswordInputData, changePasswordValidatorOptions);
  }
  public async changePassword(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data: ChangePasswordRequest = getFormData(form) as ChangePasswordRequest;
    let message;
    try {
      const { status, response } = await profileAPI.changePassword(data);
      switch (status - (status % 100)) {
        case 200:
          appBus.emit(EVENTS.MODAL_SHOW_OK, { ...modalProps, header: 'Пароль успешно изменен!' });
          appBus.emit(EVENTS.SET_MODE, MODE.INFO);
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
      console.log('ChangePasswordController catch', error);
      appRouter.go('/500');
    }
  }
}
