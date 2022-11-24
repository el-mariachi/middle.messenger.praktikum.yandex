import { EVENTS } from '../constants/events';
import store from '../store/Store';
import { UserController } from '../controllers/UserController';
import { Router } from './Router';
import { getUserState } from '../store/actions';

const appRouter = new Router();
const userController = new UserController();

export class WithUserController {
  protected userID: number | null = null;
  protected userRequired = false;
  protected escapeRoute = '/';
  constructor(protected currentPath: string, public formName = 'user_form') {
    store.on(EVENTS.STORE_UPDATED, this.switchRoute.bind(this));
    userController.loadUser().then((userLoaded) => {
      if (!userLoaded) {
        this.switchRoute();
      }
    });
  }
  switchRoute() {
    if (window.location.pathname !== this.currentPath) {
      return;
    }
    const user = getUserState();
    if (user.id === this.userID) {
      console.log('same user');
      return;
    }
    console.log('switchRoute trig', 'old', this.userID, 'new', user.id, this.currentPath);
    this.userID = user.id;
    const needToEscape =
      ((!this.userRequired && user.id) || (this.userRequired && !user.id)) &&
      window.location.pathname === this.currentPath;
    if (needToEscape) {
      appRouter.go(this.escapeRoute);
    }
  }
}
