/**
 * Example of extendable Singleton
 *
 * @class Singleton
 */
export default class Singleton {

  static name = 'Singleton'

  /**
   * Link to Singleton class instance
   *
   * @protected
   * @property {Singleton|null} _instance
   */
  protected static _instance: Singleton | null = null

  /**
   * @protected
   * @constructor
   * @param {Array{*}} ...args
   */
  protected constructor(..._args: unknown[]) {
    const self = new.target

    // Return existing instance
    if (self._instance) {
      return self._instance
    }

    // Create a new one
    self._instance = this
  }

  /**
   * Get Singleton instance
   *
   * @static
   * @method getInstance
   * @param {Array{*}} ...args
   * @returns {Singleton}
   */
  static getInstance(...args: unknown[]) {
    return new this(...args)
  }

}

export { Singleton }
