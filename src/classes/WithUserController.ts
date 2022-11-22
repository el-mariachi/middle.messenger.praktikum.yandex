import { EVENTS } from '../constants/events';
import store from '../store/Store';
import { UserController } from '../controllers/UserController';
import { Router } from './Router';
import { Block } from './Block';
import { EventBusSingl } from '../controllers/EventBusSingl';
import { modalButtonData } from '../constants/profileForm';
import Button from '../components/Button';

const appRouter = new Router();
const userController = new UserController();
const appBus = new EventBusSingl();
const modalButtons = modalButtonData.map((button) => new Button(button));

export class WithUserController {
  protected userRequired = false;
  protected escapeRoute = '/';
  constructor(
    protected currentPath: string,
    public formName: string,
    protected pageModal: Block,
    protected modalID: string
  ) {
    store.on(EVENTS.STORE_UPDATED, this.switchRoute.bind(this));
    userController.loadUser().then((userLoaded) => {
      if (!userLoaded) {
        this.switchRoute();
      }
    });
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
  public showModalOK(message: string, modalID: string) {
    if (modalID !== this.modalID) {
      return;
    }
    const modalProps = { modalID, header: message, buttons: modalButtons, error: false };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public showModalError(message: string, modalID: string) {
    if (modalID !== this.modalID) {
      return;
    }
    const modalProps = { modalID, header: 'Ошибка!', message, buttons: modalButtons, error: true };
    this.pageModal.setProps(modalProps);
    this.pageModal.show();
  }
  public hideModal(modalID: string) {
    if (modalID !== this.modalID) {
      return;
    }
    this.pageModal.hide();
  }
}
