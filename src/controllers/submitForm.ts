import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export default function submitForm(this: HTMLFormElement | null, evt: Event) {
  evt.preventDefault();
  appBus.emit(EVENTS.FORM_SUBMIT, this);
}
