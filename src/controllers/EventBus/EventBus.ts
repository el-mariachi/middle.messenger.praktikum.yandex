/* eslint-disable @typescript-eslint/no-non-null-assertion */

interface EventListener {
  // using any type here for Block._componentDidUpdate compatibility
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (...args: any[]): void;
}

export class EventBus {
  listeners: Map<string, EventListener[]> = new Map();

  on(event: string, callback: EventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    // using definite assignment operator here and below
    // there's no way for TypeScript to know that Map.has()
    // makes Map.get() non-undefined
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: EventListener) {
    if (!this.listeners.has(event)) {
      throw new Error(`Event "${event}" is missing.`);
    }
    this.listeners.set(
      event,
      this.listeners.get(event)!.filter((listener: EventListener) => listener !== callback)
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners.has(event)) {
      throw new Event(`Event "${event}" is missing.`);
    }
    if (this.listeners.get(event)!.length === 0) {
      throw new Event(`No event handlers for event "${event}" registered.`);
    }
    this.listeners.get(event)!.forEach((listener: EventListener) => {
      listener(...args);
    });
  }
}
