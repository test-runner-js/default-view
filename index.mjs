import ansi from './node_modules/ansi-escape-sequences/dist/index.mjs'

class DefaultView {
  start (count) {
    console.log(ansi.format(`\n[white]{Running ${count} tests}\n`))
  }
  testPass (test, result) {
    const indent = ' '.repeat(test.level())
    const parent = test.parent ? test.parent.name : ''
    console.log(ansi.format(`${indent}[green]{✓} [magenta]{${parent}}`), test.name, result ? `[${result}]` : '')
  }
  testFail (test, err) {
    const indent = ' '.repeat(test.level())
    const parent = test.parent ? test.parent.name : ''
    console.log(ansi.format(`${indent}[red]{⨯} [magenta]{${parent}}`), test.name)
    const lines = err.stack.split('\n').map(line => {
      const indent = ' '.repeat(test.level() + 2)
      return indent + line
    })
    console.log(ansi.format(`\n${lines.join('\n')}\n`))
  }
  testSkip (test) {
    const indent = ' '.repeat(test.level())
    console.log(ansi.format(`${indent}[gray]{- ${test.name}}`))
  }
  testIgnore (test) {
    const indent = ' '.repeat(test.level())
  }
  end (stats) {
    console.log(ansi.format(`\n[white]{Completed in: ${stats.timeElapsed()}ms. Pass: [green]{${stats.pass}}, fail: [red]{${stats.fail}}, skip: ${stats.skip}.}\n`))
  }
}

export default DefaultView
