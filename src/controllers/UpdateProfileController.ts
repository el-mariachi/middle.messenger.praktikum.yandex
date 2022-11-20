import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { userInfoInputData, updateProfileValidatorOptions, MODE } from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, UpdateProfileRequest } from '../api/ProfileAPI';
import { Router } from '../classes/Router';
import { setUser } from '../store/actions';

const appBus = new EventBusSingl();
const appRouter = new Router();
const profileAPI = new ProfileAPI();

export class UpdateProfileController extends WithUserController {
  public formName;
  constructor(currentPath: string) {
    super(currentPath);
    const { formName } = updateProfileValidatorOptions;
    this.formName = formName;
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
    let errorMessage;
    try {
      const { status, response } = await profileAPI.update(data);
      switch (status - (status % 100)) {
        case 200:
          setUser(response);
          appBus.emit(EVENTS.SET_MODE, MODE.INFO);
          break;
        case 400:
          // show error message in login field
          errorMessage = response.reason && typeof response.reason === 'string' ? response.reason : 'Unknown error';
          appBus.emit(EVENTS.INPUT_ERROR, { name: 'login', errorMessage });
          break;
        case 500:
          appRouter.go('/500');
      }
    } catch (error) {
      console.log('UpdateProfileController catch', error);
      appRouter.go('/500');
    }
  }
}
