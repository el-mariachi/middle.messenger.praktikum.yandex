interface IEventListener {
  // using any type here for Block._componentDidUpdate compatibility
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (...args: any[]): void;
}
type ICallbackList = IEventListener[];
interface IListenres {
  [eventName: string]: ICallbackList;
}

export type EventData = { name: string; value: string };
interface IEventBus {
  listeners: IListenres;
  on(event: string, callback: IEventListener): void;
  off(event: string, callback: IEventListener): void;
  emit<T extends unknown[]>(event: string, args?: T): void;
}
export class EventBusSingl implements IEventBus {
  public listeners: IListenres = {};
  static _eventBus: EventBusSingl;
  constructor() {
    if (EventBusSingl._eventBus) {
      return EventBusSingl._eventBus;
    }
    EventBusSingl._eventBus = this;
  }

  on(event: string, callback: IEventListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: IEventListener): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit<T extends unknown[]>(event: string, ...args: T): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
