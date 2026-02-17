import type {
  TItemDefaultValue,
  TItemDefaultComparator,
  TItemDefaultStringifier
} from '@/structures/Item'
import { type LinkedList, useLinkedList } from '@/structures/LinkedList'
import type { LinkedListItem } from '@/structures/LinkedListItem'

/**
 * Base class for Stack
 *
 * @class Stack
 */
export default class Stack<TValue = unknown> {

  /**
   * Class name
   *
   * @static
   * @property {string} name
   */
  static name = 'Stack'

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
   * Indicator of is stack empty or not
   *
   * @readonly
   * @property {boolean} isEmpty
   */
  get isEmpty(): boolean {
    return !this._itemsList.headItem
  }

  /**
   * Top of the stack
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
   * Get item from the top of the stack
   *
   * @method popItem
   * @returns {*|null}
   */
  popItem(): TItemDefaultValue<TValue> {
    if (this.isEmpty) {
      return null
    }

    const item = this._itemsList.deleteHead()

    return item ? item.value : null
  }

  /**
   * Put item to the top of the stack
   *
   * @method pushItem
   * @param {LinkedListItem|*} rawNewItem
   */
  pushItem(rawNewItem: LinkedListItem<TValue> | TValue): Stack<TValue> {
    this._itemsList.prependItem(rawNewItem)

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
   * Get stack as an array
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
 * @function useStack
 * @param {Function} rawComparator
 * @returns {Stack}
 */
function useStack<TValue = unknown>(
  rawComparator?: TItemDefaultComparator
): Stack<TValue> {
  return new Stack<TValue>(rawComparator)
}

export { Stack, useStack }
