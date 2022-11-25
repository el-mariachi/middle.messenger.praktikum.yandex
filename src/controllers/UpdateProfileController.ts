import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { userInfoInputData, updateProfileValidatorOptions, MODE, modalButtonData } from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, UpdateProfileRequest } from '../api/ProfileAPI';
import { Router } from '../classes/Router';
import { setUser } from '../store/actions';
import Button from '../components/Button';

const appBus = new EventBusSingl();
const appRouter = new Router();
const profileAPI = new ProfileAPI();
const buttons = modalButtonData.map((button) => new Button(button));
const modalProps = {
  buttons,
};

export class UpdateProfileController extends WithUserController {
  constructor(currentPath: string) {
    const { formName } = updateProfileValidatorOptions;
    super(currentPath, formName);
    this.userRequired = true;
    this.escapeRoute = '/';
    appBus.on(EVENTS.FORM_VALID, this.updateProfile.bind(this));
    new FormValidator(userInfoInputData, updateProfileValidatorOptions);
  }
  public async updateProfile(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data: UpdateProfileRequest = getFormData(form) as UpdateProfileRequest;
    let message;
    try {
      const { status, response } = await profileAPI.update(data);
      switch (status - (status % 100)) {
        case 200:
          setUser(response);
          appBus.emit(EVENTS.MODAL_SHOW_OK, { ...modalProps, header: 'Профиль успешно изменен!' });
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
      console.log('UpdateProfileController catch', error);
      appRouter.go('/500');
    }
  }
}
