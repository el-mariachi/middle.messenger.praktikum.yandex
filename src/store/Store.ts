import { EventBus } from '../controllers/EventBusExt';
import { EVENTS } from '../constants/events';
import set from '../utils/set';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type State = Record<string, any>;

class Store extends EventBus {
  private _state: State = {};

  public getState() {
    return this._state;
  }
  public set(path: string, value: unknown): void {
    set(this._state, path, value);
    this.emit(EVENTS.STORE_UPDATED);
  }
}

export default new Store();
