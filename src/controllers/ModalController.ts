import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { IProps } from '../classes/Block';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { Form } from '../components/Form/Form';

export type ModalProps = IProps & {
  header?: string;
  message?: string;
  buttons?: Button[];
  modalForm?: Form;
  error?: boolean;
};

export class ModalController {
  constructor(protected modal: Modal) {
    const appBus = new EventBusSingl();
    appBus.on(EVENTS.MODAL_SHOW_OK, this.showModalOK.bind(this));
    appBus.on(EVENTS.MODAL_SHOW_ERROR, this.showModalError.bind(this));
    appBus.on(EVENTS.MODAL_HIDE, this.hideModal.bind(this));
  }
  public showModalOK(modalProps: ModalProps) {
    this.modal.reset();
    this.modal.setProps(modalProps);
    this.modal.dispatchComponentDidMount();
    this.modal.show();
  }
  public showModalError(modalProps: ModalProps) {
    this.modal.reset();
    this.modal.setProps({ ...modalProps, header: 'Ошибка!' });
    this.modal.dispatchComponentDidMount();
    this.modal.show();
  }
  public hideModal() {
    this.modal.hide();
  }
}
