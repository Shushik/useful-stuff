import { Singleton } from '@/patterns/Singleton'

class TestSingleton extends Singleton {

  static counter: number = 0

  protected constructor(rawOrder: number) {
    const self = new.target
    const created = !!self._instance

    super()

    if (created) {
      return this
    }

    self.counter += 1
  }

  static getInstance(rawOrder: number): TestSingleton {
    return new this(rawOrder)
  }

}

describe(`${Singleton.name}`, () => {

  it(`Should create proper instance of ${Singleton.name}`, () => {
    const testSingleton1 = TestSingleton.getInstance(1)
    const testSingleton2 = TestSingleton.getInstance(2)

    expect(TestSingleton.counter).toBe(1)
  })

})
