import { EventBus } from '../controllers/EventBusExt';

export type State = Record<string, any>;

class Store extends EventBus {
  private _state: State = {};

  public getState() {
    return this._state;
  }
  public set(path: string, value: unknown): void {
    // set
    // emit
  }
}

export default new Store();
