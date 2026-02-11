export default class Singleton {

  static name = 'Singleton'

  protected static _instance: Singleton | null = null

  protected constructor(..._args: unknown[]) {
    const self = new.target

    if (self._instance) {
      return self._instance
    }

    self._instance = this
  }

  static getInstance(...args: unknown[]) {
    return new this(...args)
  }

}

export { Singleton }
