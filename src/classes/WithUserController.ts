import { EVENTS } from '../constants/events';
import store, { UserData, userStruct } from '../store/Store';
import { UserController } from '../controllers/UserController';
import { Router } from './Router';

const appRouter = new Router();
const userController = new UserController();

export class WithUserController {
  protected userRequired = false;
  protected escapeRoute = '/';
  constructor(protected currentPath: string, protected user: UserData = userStruct) {
    store.on(EVENTS.STORE_UPDATED, this.switchRoute.bind(this));
    userController.loadUser();
  }
  switchRoute() {
    const { user } = store.getState();
    const needToEscape =
      ((!this.userRequired && user.id) || (this.userRequired && !user.id)) &&
      window.location.pathname === this.currentPath;
    if (needToEscape) {
      appRouter.go(this.escapeRoute);
    }
  }
}
