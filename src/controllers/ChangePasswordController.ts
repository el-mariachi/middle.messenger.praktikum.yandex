import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { changePasswordInputData, changePasswordValidatorOptions, MODE } from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, ChangePasswordRequest } from '../api/ProfileAPI';
import { Router } from '../classes/Router';
import { setUser } from '../store/actions';

const appBus = new EventBusSingl();
const appRouter = new Router();
const profileAPI = new ProfileAPI();

export class ChangePasswordController extends WithUserController {
  public formName;
  constructor(currentPath: string) {
    super(currentPath);
    const { formName } = changePasswordValidatorOptions;
    this.formName = formName;
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
          // setUser(response);
          appBus.emit(EVENTS.SET_MODE, MODE.INFO);
          alert('Пароль успешно изменен');
          // TODO show success
          break;
        case 400:
          // show error message in login field
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'newPassword', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('ChangePasswordController catch', error);
      appRouter.go('/500');
    }
  }
}
