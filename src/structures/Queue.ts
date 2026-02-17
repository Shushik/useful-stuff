import type {
  TItemDefaultValue,
  TItemDefaultComparator,
  TItemDefaultStringifier
} from '@/structures/Item'
import { type LinkedList, useLinkedList } from '@/structures/LinkedList'
import type { LinkedListItem } from '@/structures/LinkedListItem'

/**
 * Base class for Queue
 *
 * @class Queue
 */
export default class Queue<TValue = unknown> {

  /**
   * Class name
   *
   * @static
   * @property {string} name
   */
  static name = 'Queue'

  /**
   * LinkedList instance for items list
   *
   * @protected
   * @property {LinkedList} _itemsList
   */
  protected _itemsList: LinkedList<TValue>

  /**
   * @constructor
   * @param {Function} rawComparator
   */
  constructor(readonly rawComparator?: TItemDefaultComparator) {
    this._itemsList = useLinkedList<TValue>(rawComparator)
  }

  /**
   * Indicator of is queue empty or not
   *
   * @readonly
   * @property {boolean} isEmpty
   */
  get isEmpty(): boolean {
    return !this._itemsList.headItem
  }

  /**
   * Top of the queue
   *
   * @readonly
   * @property {*} peekValue
   */
  get peekValue(): TItemDefaultValue<TValue> {
    if (this.isEmpty) {
      return null
    }

    return this._itemsList.headItem ?
      this._itemsList.headItem.value :
      null
  }

  /**
   * Get item from the top of the queue
   *
   * @method dequeueItem
   * @returns {*|null}
   */
  dequeueItem(): TItemDefaultValue<TValue> {
    if (this.isEmpty) {
      return null
    }

    const item = this._itemsList.deleteHead()

    return item ? item.value : null
  }

  /**
   * Put item to the end of the queue
   *
   * @method enqueueItem
   * @param {LinkedListItem|*} rawNewItem
   */
  enqueueItem(rawNewItem: LinkedListItem<TValue> | TItemDefaultValue<TValue>): Queue<TValue> {
    this._itemsList.appendItem(rawNewItem)

    return this
  }

  /**
   * Regular valueOf object method wrapper
   *
   * @method valueOf
   * @returns {*[]}
   */
  valueOf(): TItemDefaultValue<TValue>[] {
    if (this.isEmpty) {
      return [ ]
    }

    return this._itemsList.valueOf()
  }

  /**
   * Get queue as an array
   *
   * @method toArray
   * @returns {*[]}
   */
  toArray(): LinkedListItem<TValue>[] {
    if (this.isEmpty) {
      return [ ]
    }

    return this._itemsList.toArray()
  }

  /**
   * Regular toString object method wrapper
   *
   * @method toString
   * @param {Function?} stringifier
   * @returns {string}
   */
  toString(stringifier?: TItemDefaultStringifier<TValue>): string {
    if (this.isEmpty) {
      return ''
    }

    return this._itemsList.toString(stringifier)
  }

}

/**
 * Function wrapper returns Queue instance
 *
 * @function useQueue
 * @param {Function} rawComparator
 * @returns {Queue}
 */
function useQueue<TValue = unknown>(
  rawComparator?: TItemDefaultComparator
): Queue<TValue> {
  return new Queue<TValue>(rawComparator)
}

export { Queue, useQueue }
