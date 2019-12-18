import DefaultView from './index.mjs'
import Tom from 'test-object-model'

const defaultView = new DefaultView({ viewShowStarts: true })

{ /* main report */
  async function start () {
    await defaultView.init()
    console.log('Main report:')
    defaultView.start(10)
    const root = new Tom('root')
    const parent = root.group('parent')
    const test = parent.test('main test 1', () => 1)
    await test.run()
    defaultView.testStart(test)
    defaultView.testSkip(test)
    const test2 = parent.test('main test 2', () => 2)
    await test2.run()
    defaultView.testPass(test2)
    const test3 = parent.test('main test 3', () => { throw new Error('broken') })
    try {
      await test3.run()
    } catch (err) {
      defaultView.testFail(test3)
    }

    const todo = parent.todo('main: a todo')
    defaultView.testTodo(todo)
  }

  start().catch(console.error)
}

{ /* no root group, context data: pass */
  async function start () {
    await defaultView.init()
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

{ /* no root group, context data: fail */
  async function start () {
    await defaultView.init()
    const test = new Tom('context data: fail', function () {
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

{ /* deep tree, multiple parents: pass and fail */
  async function start () {
    await defaultView.init()
    const tom = new Tom('root')
    const level1 = tom.group('level 1')
    const level2 = level1.group('level 2')
    const test = level2.test('deep tree', function () {})
    const test2 = level2.test('deep tree fail', function () {
      throw new Error('broken')
    })

    await test.run()
    defaultView.testPass(test)

    try {
      await test2.run()
    } catch (err) {
      defaultView.testFail(test2)
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
