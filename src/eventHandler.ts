import { handleWebSocket } from "./ws";

export class EventHandler {
  private events: Map<string, Set<Function>>;

  constructor() {
    this.events = new Map();
  }

  public on(eventName: string, listener: Function): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName)!.add(listener);
  }

  public off(eventName: string, listener: Function): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(eventName);
      }
    }
  }

  public emit(eventName: string, ...args: any[]): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }

  public once(eventName: string, listener: Function): void {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  public removeAllListeners(eventName?: string): void {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  public listenerCount(eventName: string): number {
    const listeners = this.events.get(eventName);
    return listeners ? listeners.size : 0;
  }

  public listeners(eventName: string): Function[] {
    const listeners = this.events.get(eventName);
    return listeners ? Array.from(listeners) : [];
  }


}
