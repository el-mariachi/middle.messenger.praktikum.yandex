import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { WithUserController } from '../classes/WithUserController';
import { LoginController } from './LoginController';
import { Router } from '../classes/Router';

const appBus = new EventBusSingl();
const appRouter = new Router();
const loginController = new LoginController();

export class UserInfoController extends WithUserController {
  public formName;
  constructor(currentPath: string) {
    super(currentPath);
    appBus.on(EVENTS.REQUEST_LOGOUT, this.logout.bind(this));
    this.formName = 'user_info_form';
    this.userRequired = true;
    this.escapeRoute = '/';
  }
  public async logout() {
    const success = await loginController.logout();
    if (success) {
      appRouter.go(this.escapeRoute);
    }
  }
}
