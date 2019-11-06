import ansi from './node_modules/ansi-escape-sequences/dist/index.mjs'

class DefaultView {
  constructor (options) {
    this.options = options
  }

  start (count) {
    console.log(ansi.format(`\n[white]{Start: ${count} tests loaded}\n`))
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
    const lines = this.getErrorMessage(err).split('\n').map(line => {
      const indent = ' '.repeat(test.level() + 2)
      return indent + line
    })
    console.log(ansi.format(`\n${lines.join('\n').trimEnd()}\n`))
  }

  getErrorMessage (err) {
    if (this.options.viewHideErrStack) {
      return err.message
    } else {
      return err.stack
    }
  }

  testSkip (test) {
    if (this.options.viewShowSkips) {
      const indent = ' '.repeat(test.level())
      const parent = test.parent ? test.parent.name : ''
      console.log(ansi.format(`${indent}[grey]{-} [grey]{${parent}} [grey]{${test.name}}`))
    }
  }

  testIgnore (test) {}

  /**
   * @params {object} stats
   * @params {object} stats.fail
   * @params {object} stats.pass
   * @params {object} stats.skip
   * @params {object} stats.start
   * @params {object} stats.end
   */
  end (stats) {
    const timeElapsed = stats.end - stats.start
    const failColour = stats.fail > 0 ? 'red' : 'white'
    const passColour = stats.pass > 0 ? 'green' : 'white'
    const skipColour = stats.skip > 0 ? 'grey' : 'white'
    console.log(ansi.format(`\n[white]{Completed in ${timeElapsed}ms. Pass: [${passColour}]{${stats.pass}}, fail: [${failColour}]{${stats.fail}}, skip: [${skipColour}]{${stats.skip}}.}\n`))
  }

  static optionDefinitions () {
    return [
      {
        name: 'view.show-skips',
        type: Boolean
      },
      {
        name: 'view.hide-err-stack',
        type: Boolean
      },
    ]
  }
}

export default DefaultView
