import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { logForm } from '../utils/logForm';

export class FormSender {
  constructor() {
    const appBus = new EventBusSingl();
    appBus.on(EVENTS.FORM_VALID, logForm);
  }
}
