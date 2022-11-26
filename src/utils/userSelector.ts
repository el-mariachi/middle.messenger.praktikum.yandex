import { EventBusSingl } from '../controllers/EventBusSingl';

const appBus = new EventBusSingl();

export default function userSelector(evt: Event): void {
  const target = evt.target as HTMLElement;
  const { event, id } = target.dataset;
  if (event && id) {
    appBus.emit(event, parseInt(id));
  }
}
