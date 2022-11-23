import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export default function selectChat(evt: Event): void {
  appBus.emit(EVENTS.CHAT_SELECT, evt);
}
