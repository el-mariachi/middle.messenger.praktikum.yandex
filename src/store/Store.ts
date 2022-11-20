import { EventBus } from '../controllers/EventBusExt';
import { EVENTS } from '../constants/events';
import set from '../utils/set';
import defaultAvatar from '../../static/images/chuvak130.png';

export type UserData = {
  id: number | null;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export const userStruct: UserData = {
  id: null,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: defaultAvatar,
};

export type State = {
  [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  user: UserData;
};

class Store extends EventBus {
  private _state: State = {
    user: userStruct,
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
