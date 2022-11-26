import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export default function inputBlurHandler(this: HTMLInputElement): void {
  const formName = this.form ? this.form.name : undefined;
  appBus.emit(EVENTS.INPUT_BLUR, { name: this.name, value: this.value, formName });
}
