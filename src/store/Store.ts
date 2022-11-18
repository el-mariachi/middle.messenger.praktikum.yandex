import { EventBus } from '../controllers/EventBusExt';
import { EVENTS } from '../constants/events';
import set from '../utils/set';

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type State = {
  [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  user: UserData | null;
};

class Store extends EventBus {
  private _state: State = {
    user: null,
  };

  public getState() {
    return this._state;
  }
  public set(path: string, value: unknown): void {
    set(this._state, path, value);
    this.emit(EVENTS.STORE_UPDATED);
  }
}

export default new Store();
