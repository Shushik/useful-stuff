/**
 * Publisher based on custom events (or event emitter
 * if you like it more)
 *
 * @class Publisher
 */
export default class Publisher<TData = unknown> {

  static name = 'Publisher'

  /**
   * Event emitter
   *
   * @protected
   * @property {EventTarget} _dispatcher
   */
  protected _dispatcher: EventTarget

  /**
   * @constructor
   */
  constructor() {
    this._dispatcher = new EventTarget()
  }

  /**
   * Subscribes listener function to event emitter
   *
   * @method on
   * @param {string} rawType
   * @param {Function} rawListener
   */
  on(rawType: string, rawListener: EventListener | EventListenerObject) {
    this._dispatcher.addEventListener(rawType, rawListener)
  }

  /**
   * Unsubscribes listener function to event emitter
   *
   * @method off
   * @param {string} rawType
   * @param {Function} rawListener
   */
  off(rawType: string, rawListener: EventListener | EventListenerObject) {
    this._dispatcher.removeEventListener(rawType, rawListener)
  }

  /**
   * Emits (fires) event
   *
   * @method emit
   * @param {string} rawType
   * @param {Object} rawData
   * @param {Object} rawData
   * @emits {CustomEvent}
   */
  emit(rawType: string, rawData: TData, rawOptions?: CustomEvent) {
    // Create and fill event object
    const event = new CustomEvent(rawType, {
      bubbles: true,
      cancelable: true,
      type: rawType,
      target: null,
      // Rewrite options if needed
      ...rawOptions,
      // Add event data
      detail: rawData
    })

    // Emit event
    this._dispatcher.dispatchEvent(event)
  }

}

/**
 * Create Publisher example
 *
 * @function usePublisher
 */
function usePublisher<TData = unknown>(): Publisher {
  return new Publisher<TData>()
}


type TCallback = (...args: unknown[]) => unknown

/**
 * Old Publisher based on callbacks (without events)
 *
 * Saved for history
 *
 * @class Publisher
 */
class OldPublisher {

  static name = 'OldPublisher'

  /**
   * callbacks holder
   *
   * @protected
   * @property {Object{Function[]}} _dispatcher
   */
  protected _events: { [id: string]: TCallback[] }

  /**
   * @constructor
   */
  constructor() {
    this._events = { }
  }

  /**
   * Subscribes listener function to event emitter
   *
   * @method on
   * @param {string} rawType
   * @param {Function} rawCallback
   */
  on(rawType: string, rawCallback: TCallback) {
    // Create callbacks array for a given type
    // of chosen event type
    if (!this._events[rawType]) {
      this._events[rawType] = [ ] as TCallback[]
    }

    // Save callback to a callback array
    this._events[rawType].push(rawCallback)
  }

  /**
   * Unsubscribes listener function to event emitter
   *
   * If the second argument hasn't set, removes all
   * listeners for a chosen event type
   *
   * @method off
   * @param {string} rawType
   * @param {Function?} rawCallback
   */
  off(rawType: string, rawCallback?: TCallback) {
    // Check if event type exists
    if (!this._events[rawType]) {
      return
    }

    // If callback hasn't set, remove all callbacks
    if (!rawCallback) {
      delete this._events[rawType]

      return
    }

    // Find and remove chosen callback
    this._events[rawType] = this._events[rawType].filter(
      (callback) => callback !== rawCallback
    )
  }

  /**
   * Emits (fires) event
   *
   * @method emit
   * @param {string} rawType
   * @param {Array{*}} ...args
   * @emits {CustomEvent}
   */
  emit(rawType: string, ...args: unknown[]) {
    // Check if event type exists
    if (!this._events[rawType]) {
      return
    }

    // Run all saved listeners (with args as an array)
    this._events[rawType].forEach(
      (eventHandler) => eventHandler(...args)
    )
  }

}

/**
 * Create OldPublisher example
 *
 * @function useOldPublisher
 */
function useOldPublisher(): OldPublisher {
  return new OldPublisher()
}

export { Publisher, OldPublisher, usePublisher, useOldPublisher }
