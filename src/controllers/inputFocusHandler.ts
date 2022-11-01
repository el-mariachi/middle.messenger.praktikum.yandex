import { EventBusSingl } from './EventBusSingl';
import { EVENTS } from '../constants/events';

const appBus = new EventBusSingl();

export default function inputFocusHandler(this: HTMLInputElement): void {
  appBus.emit(EVENTS.INPUT_FOCUS, { name: this.name, value: this.value });
}
