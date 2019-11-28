import DefaultView from './index.mjs'
import Tom from 'test-object-model'

const defaultView = new DefaultView({ viewShowStarts: true })

{
  async function start () {
    await defaultView.init()
    console.log('Main report:')
    defaultView.start(10)
    const parent = new Tom('parent')
    const test = parent.test('test 1', () => 1)
    await test.run()
    defaultView.testStart(test)
    defaultView.testSkip(test)
    const test2 = parent.test('test 2', () => 2)
    await test2.run()
    defaultView.testPass(test2)
    const test3 = parent.test('test 3', () => { throw new Error('broken') })
    try {
      await test3.run()
    } catch (err) {
      defaultView.testFail(test3, test3.result)
    }
  }

  start().catch(console.error)
}

{
  async function start () {
    await defaultView.init()
    console.log('In-test data:')
    const test = new Tom('test 1', function () {
      this.data = {
        something: 'one',
        yeah: true
      }
    })
    await test.run()
    defaultView.testPass(test)
  }

  start().catch(console.error)
}

{
  async function start () {
    await defaultView.init()
    const test = new Tom('test 2', function () {
      this.data = {
        something: 'one',
        yeah: true
      }
      throw new Error('broken')
    })
    try {
      await test.run()
    } catch (err) {
      defaultView.testFail(test, test.result)
    }
  }

  start().catch(console.error)
}

console.log('Footer: pass colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 10,
  fail: 0,
  skip: 0,
  ignore: 0,
  timeElapsed: function () {
    return this.end - this.start
  }
})

console.log('Footer: fail colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 0,
  fail: 10,
  skip: 0,
  ignore: 0,
  timeElapsed: function () {
    return this.end - this.start
  }
})

console.log('Footer: skip colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 0,
  fail: 0,
  skip: 10,
  ignore: 0,
  timeElapsed: function () {
    return this.end - this.start
  }
})
