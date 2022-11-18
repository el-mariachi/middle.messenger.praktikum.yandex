// import { EventBusSingl } from './EventBusSingl';
// import { EVENTS } from '../constants/events';
import { FormValidator } from './FormValidator';
import { inputData, validatorOptions } from '../constants/profileForm';
// import { getFormData } from '../utils/getFormData';
// import { UserController } from './UserController';
// import { Router } from '../classes/Router';

// const appBus = new EventBusSingl();
// const appRouter = new Router();
// const userController = new UserController();

export class EditProfileController {
  public formName;
  constructor() {
    const { formName } = validatorOptions;
    this.formName = formName;
    // appBus.on(EVENTS.FORM_VALID, this.signup.bind(this));

    // Validator receives the inputs at this stage
    // The avatar image file input is technically also an input
    // but is added and handled independently. It doesn't get it's InputGroup
    new FormValidator(inputData, validatorOptions);
  }
}
