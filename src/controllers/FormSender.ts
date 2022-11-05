import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';
import { logForm } from '../utils/logForm';

export class FormSender {
  constructor(public formName: string) {
    const appBus = new EventBusSingl();
    appBus.on(EVENTS.FORM_VALID, this.checkFormName.bind(this));
  }
  checkFormName(form: HTMLFormElement) {
    if (this.formName === form.name) {
      logForm(form);
    }
  }
}
