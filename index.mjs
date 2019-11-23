import ansi from './node_modules/ansi-escape-sequences/dist/index.mjs'

class DefaultView {
  /**
   * @param {object} [options]
   * @param {object} [options.viewHideSkips]
   * @param {object} [options.viewHideErrStack]
   * @param {object} [options.viewShowStarts]
   */
  constructor (options = {}) {
    this.options = options
  }

  log (...args) {
    console.log(...args)
  }

  start (count) {
    this.log(ansi.format(`\n[white]{Start: ${count} tests loaded}\n`))
  }

  testStart (test) {
    if (this.options.viewShowStarts) {
      const parent = test.parent ? test.parent.name : ''
      this.log(ansi.format(`[rgb(110,0,110)]{∙ ${parent}} [rgb(135,135,135)]{${test.name}}`))
    }
  }

  testPass (test, result) {
    const parent = test.parent ? test.parent.name : ''
    this.log(ansi.format(`[green]{✓} [magenta]{${parent}}`), test.name, result ? `[${result}]` : '')
  }

  testFail (test, err) {
    const parent = test.parent ? test.parent.name : ''
    this.log(ansi.format(`[red]{⨯} [magenta]{${parent}}`), test.name)
    const lines = this.getErrorMessage(err).split('\n').map(line => {
      return '   ' + line
    })
    this.log(ansi.format(`\n${lines.join('\n').trimEnd()}\n`))
  }

  getErrorMessage (err) {
    if (this.options.viewHideErrStack) {
      return err.message
    } else {
      return err.stack
    }
  }

  testSkip (test) {
    if (!this.options.viewHideSkips) {
      const parent = test.parent ? test.parent.name : ''
      this.log(ansi.format(`[grey]{-} [grey]{${parent}} [grey]{${test.name}}`))
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
    const failColour = stats.fail > 0 ? 'red' : 'white'
    const passColour = stats.pass > 0 ? 'green' : 'white'
    const skipColour = stats.skip > 0 ? 'grey' : 'white'
    this.log(ansi.format(`\n[white]{Completed in ${stats.timeElapsed()}ms. Pass: [${passColour}]{${stats.pass}}, fail: [${failColour}]{${stats.fail}}, skip: [${skipColour}]{${stats.skip}}.}\n`))
  }

  static optionDefinitions () {
    return [
      {
        name: 'view.hide-skips',
        type: Boolean
      },
      {
        name: 'view.hide-err-stack',
        type: Boolean
      },
      {
        name: 'view.show-starts',
        type: Boolean
      },
    ]
  }
}

export default DefaultView
