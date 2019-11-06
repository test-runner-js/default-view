import DefaultView from './index.mjs'
import Tom from 'test-object-model'

const defaultView = new DefaultView()

{
  const parent = new Tom('parent')
  const test = parent.test('test 1')
  defaultView.testSkip(test)
  const test2 = parent.test('test 2')
  defaultView.testSkip(test2)
}

console.log('Footer: pass colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 10,
  fail: 0,
  skip: 0,
  ignore: 0
})

console.log('Footer: fail colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 0,
  fail: 10,
  skip: 0,
  ignore: 0
})

console.log('Footer: skip colour')
defaultView.end({
  start: 10000,
  end: 20000,
  pass: 0,
  fail: 0,
  skip: 10,
  ignore: 0
})
