import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export const hideModal = (): void => {
  appBus.emit(EVENTS.MODAL_HIDE);
};
