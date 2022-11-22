import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export const hideModal = (e: Event): void => {
  const target = e.target as HTMLButtonElement;
  const container = target.closest('div.Modal-Dialog') as HTMLDivElement;
  let modalID;
  if (container) {
    modalID = container.dataset.id;
  }
  appBus.emit(EVENTS.MODAL_HIDE, modalID);
};
