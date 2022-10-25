interface IEventListener {
  // using any type here for Block._componentDidUpdate compatibility
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (...args: any[]): void;
}

interface ICallbackList {
  [id: string]: IEventListener;
}

interface Ilistenres {
  [eventName: string]: ICallbackList;
}

interface ISubscribe {
  unsubscribe: () => void;
}

interface IEventBus {
  on(eventName: string, callback: IEventListener): ISubscribe;
  once(eventName: string, callback: IEventListener): ISubscribe;
  emit<T extends unknown[]>(eventName: string, ...args: T): void;
  clear(eventName: string): void;
}

export class EventBusSingl implements IEventBus {
  private _listeners: Ilistenres = {};
  private _callbackId = 0;
  static _eventBus: EventBusSingl;

  constructor() {
    if (EventBusSingl._eventBus) {
      return EventBusSingl._eventBus;
    }
    EventBusSingl._eventBus = this;
  }

  on(eventName: string, callback: IEventListener): ISubscribe {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = {};
    }
    const id = this._callbackId++;

    this._listeners[eventName][id] = callback;

    const unsubscribe = () => {
      delete this._listeners[eventName][id];
      // If there are no more subscriptions, clear the event object
      if (Object.keys(this._listeners[eventName]).length === 0) {
        delete this._listeners[eventName];
      }
    };
    return { unsubscribe };
  }

  once(eventName: string, callback: IEventListener): ISubscribe {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = {};
    }
    const id = 'd' + this._callbackId++;
    this._listeners[eventName][id] = callback;
    const unsubscribe = () => {
      delete this._listeners[eventName][id];
      // If there are no more subscriptions, clear the event object
      if (Object.keys(this._listeners[eventName]).length === 0) {
        delete this._listeners[eventName];
      }
    };
    return { unsubscribe };
  }
  emit<T extends unknown[]>(eventName: string, ...args: T): void {
    const callbacksObj = this._listeners[eventName];
    if (!callbacksObj) {
      /* eslint-disable-next-line no-console */
      return console.warn(`Event ${eventName} not found!`);
    }
    Object.entries(callbacksObj).forEach(([callbackId, callback]) => {
      callback(...args);
      if (callbackId[0] === 'd') {
        delete callbacksObj[callbackId];
      }
    });
  }
  clear(eventName?: string): void {
    // clear all if no name provided
    if (!eventName) {
      this._listeners = {};
      return;
    }
    // otherwise clear the specified event
    delete this._listeners[eventName];
  }
}
