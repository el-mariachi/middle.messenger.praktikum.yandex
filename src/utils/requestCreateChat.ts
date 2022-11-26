import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export const requestCreateChat = (): void => {
  appBus.emit(EVENTS.CHAT_CREATE_REQUEST);
};
