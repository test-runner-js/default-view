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

  async init () {
    if (typeof window === 'undefined') {
      this._util = await import('util')
    }
  }

  log (...args) {
    const msg = args.join(' ')
    console.log(ansi.format(msg))
  }

  start (count) {
    this.log(`\n[white]{Start: ${count} tests loaded}\n`)
  }

  testStart (test) {
    if (this.options.viewShowStarts) {
      const parent = test.parent ? test.parent.name : ''
      this.log(`[rgb(110,0,110)]{∙ ${parent}} [rgb(135,135,135)]{${test.name}}`)
    }
  }

  testPass (test, result) {
    const parent = test.parent ? test.parent.name : ''
    result = result === undefined ? '' : ` [${result}]`
    const duration = test.stats.duration.toFixed(1) + 'ms'
    this.log(`[green]{✓} [magenta]{${parent}} ${test.name}${result} [rgb(100,100,0)]{${duration}}`)
    if (test.context.data) {
      if (typeof window === 'undefined') {
        const str = this.inspect(test.context.data)
        const data = this.indent(str, '   ')
        this.log(`\n${data.trimEnd()}\n`)
      }
    }
  }

  testFail (test, err) {
    const parent = test.parent ? test.parent.name : ''
    this.log(`[red]{⨯} [magenta]{${parent}}`, test.name)
    const errMessage = this.indent(this.getErrorMessage(err), '   ')
    this.log(`\n${errMessage.trimEnd()}\n`)
    if (test.context.data) {
      if (typeof window === 'undefined') {
        const str = this.inspect(test.context.data)
        const data = this.indent(str, '   ')
        this.log(`\n${data.trimEnd()}\n`)
      }
    }
  }

  inspect (input) {
    if (typeof window === 'undefined') {
      return this._util.inspect(input, { colors: true })
    } else {
      return JSON.stringify(input, null, '  ')
    }
  }

  indent (input, indentWith) {
    const lines = input.split('\n').map(line => {
      return indentWith + line
    })
    return lines.join('\n')
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
      this.log(`[grey]{-} [grey]{${parent}} [grey]{${test.name}}`)
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
    this.log(`\n[white]{Completed in ${stats.timeElapsed()}ms. Pass: [${passColour}]{${stats.pass}}, fail: [${failColour}]{${stats.fail}}, skip: [${skipColour}]{${stats.skip}}.}\n`)
  }

  static optionDefinitions () {
    return [
      {
        name: 'view.hide-skips',
        type: Boolean,
        description: 'Hide skipped tests.'
      },
      {
        name: 'view.hide-err-stack',
        type: Boolean,
        description: 'Under a failed test, show the error message instead of the full error stack.'
      },
      {
        name: 'view.show-starts',
        type: Boolean,
        description: 'Show test start events.'
      },
    ]
  }
}

export default DefaultView
