import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { changePasswordInputData, changePasswordValidatorOptions, MODE } from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, ChangePasswordRequest } from '../api/ProfileAPI';
import { Router } from '../classes/Router';
import { Block } from '../classes/Block';

const appBus = new EventBusSingl();
const appRouter = new Router();
const profileAPI = new ProfileAPI();

export class ChangePasswordController extends WithUserController {
  constructor(currentPath: string, pageModal: Block) {
    const { formName } = changePasswordValidatorOptions;
    super(currentPath, formName, pageModal);
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
    let errorMessage;
    try {
      const { status, response } = await profileAPI.changePassword(data);
      switch (status - (status % 100)) {
        case 200:
          appBus.emit(EVENTS.MODAL_SHOW_OK, 'Пароль успешно изменен!', form.name);
          appBus.emit(EVENTS.SET_MODE, MODE.INFO);
          break;
        case 400:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage, form.name);
          // appBus.emit(EVENTS.INPUT_ERROR, { name: 'newPassword', errorMessage });
          break;
        case 500:
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.MODAL_SHOW_ERROR, errorMessage);
      }
    } catch (error) {
      console.log('ChangePasswordController catch', error, form.name);
      appRouter.go('/500');
    }
  }
}
