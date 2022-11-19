import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';
import store, { UserData } from '../store/Store';
import isEqual from '../utils/isEqual';
import { UserController } from '../controllers/UserController';
import { Router } from './Router';

const appBus = new EventBusSingl();
const appRouter = new Router();
const userController = new UserController();

export class WithUserController {
  constructor(protected currentPath: string, protected _user: UserData | null = null) {
    store.on(EVENTS.STORE_UPDATED, this.checkUser.bind(this));
    appBus.on(EVENTS.USER_UPDATED, this.switchRoute.bind(this));
    userController.loadUser();
  }
  checkUser() {
    const { user } = store.getState();

    if (!user) {
      this._user = user;
      return;
    }
    if (this._user === null) {
      appBus.emit(EVENTS.USER_UPDATED, user);
      this._user = user;
      return;
    }
    if (!isEqual(user, this._user)) {
      appBus.emit(EVENTS.USER_UPDATED, user);
    }
    this._user = user;
  }
  switchRoute(user: UserData | null) {
    if (user && window.location.pathname === this.currentPath) {
      appRouter.go('/chat_list');
    }
  }
}
