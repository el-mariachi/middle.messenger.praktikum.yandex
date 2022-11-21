import { EVENTS } from '../constants/events';
import store, { UserData, userStruct } from '../store/Store';
import { UserController } from '../controllers/UserController';
import { Router } from './Router';
import { Block } from './Block';
import { EventBusSingl } from '../controllers/EventBusSingl';
import { avatarModalButtonData } from '../constants/profileForm';
import Button from '../components/Button';

const appRouter = new Router();
const userController = new UserController();
const appBus = new EventBusSingl();
const modalButtons = avatarModalButtonData.map((button) => new Button(button));

export class WithUserController {
  protected userRequired = false;
  protected escapeRoute = '/';
  constructor(
    protected currentPath: string,
    public formName: string,
    protected pageModal: Block,
    protected user: UserData = userStruct
  ) {
    store.on(EVENTS.STORE_UPDATED, this.switchRoute.bind(this));
    userController.loadUser();
    appBus.on(EVENTS.MODAL_SHOW_OK, this.showModalOK.bind(this));
    appBus.on(EVENTS.MODAL_SHOW_ERROR, this.showModalError.bind(this));
    appBus.on(EVENTS.MODAL_HIDE, this.hideModal.bind(this));
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
  public showModalOK(message: string, formName: string) {
    if (formName !== this.formName) {
      return;
    }
    const modalProps = { formName, header: message, buttons: modalButtons, error: false };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public showModalError(message: string, formName: string) {
    if (formName !== this.formName) {
      return;
    }
    const modalProps = { formName, header: 'Ошибка!', message, buttons: modalButtons, error: true };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public hideModal(formName: string) {
    if (formName !== this.formName) {
      return;
    }
    this.pageModal.hide();
  }
}
