import { EventBusSingl } from '../controllers/EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export default function userSearch(evt: Event): void {
  const target = evt.target as HTMLInputElement;
  appBus.emit(EVENTS.FORM_SUBMIT, target.form);
}
