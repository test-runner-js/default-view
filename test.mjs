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

defaultView.end({
  start: 10000,
  end: 20000,
  pass: 10,
  fail: 0,
  skip: 0,
  ignore: 0
})

defaultView.end({
	start: 10000,
  end: 20000,
  pass: 0,
  fail: 10,
  skip: 1,
  ignore: 1
})

defaultView.end({
	start: 10000,
  end: 20000,
  pass: 5,
  fail: 5,
  skip: 1,
  ignore: 1
})
