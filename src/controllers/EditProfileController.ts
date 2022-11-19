import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/profileForm';
import { WithUserController } from '../classes/WithUserController';
import { getFormData } from '../utils/getFormData';
import { ProfileAPI, ChangePasswordRequest, UpdateProfileRequest } from '../api/ProfileAPI';
// import { UserController } from './UserController';
// import { Router } from '../classes/Router';

const appBus = new EventBusSingl();
// const appRouter = new Router();
// const userController = new UserController();

export class EditProfileController extends WithUserController {
  static _editProfileController: EditProfileController;
  public formName;
  constructor(currentPath: string) {
    super(currentPath);
    if (EditProfileController._editProfileController) {
      return EditProfileController._editProfileController;
    }
    const { formName } = validatorOptions;
    this.formName = formName;
    this.userRequired = true;
    this.escapeRoute = '/';
    appBus.on(EVENTS.FORM_VALID, this.editProfile.bind(this));

    // Validator receives the inputs at this stage
    // The avatar image file input is technically also an input
    // but is added and handled independently. It doesn't get it's InputGroup
    new FormValidator(inputData, validatorOptions);
    EditProfileController._editProfileController = this;
  }
  public async editProfile(form: HTMLFormElement) {
    if (form.name !== this.formName) {
      return;
    }
    const data: UpdateProfileRequest = getFormData(form) as UpdateProfileRequest;
  }
  public async changePassword(form: HTMLFormElement) {
    //
  }
}
