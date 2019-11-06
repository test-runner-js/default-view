import ansi from './node_modules/ansi-escape-sequences/dist/index.mjs'

/* print only error message, not full error stack */
class OneLineError {
  testFail (test, err) {
    const indent = ' '.repeat(test.level())
    const parent = test.parent ? test.parent.name : ''
    console.log(ansi.format(`${indent}[red]{⨯} [magenta]{${parent}}`), test.name)
    // const lines = err.stack.split('\n').map(line => {
    //   const indent = ' '.repeat(test.level() + 2)
    //   return indent + line
    // }).slice(0, 1)
    const lines = err.message
      .split('\n')
      .map(line => {
        const indent = ' '.repeat(test.level() + 2)
        return indent + line
      })
      .filter(line => line.trim())
    console.log(ansi.format(`[grey]{${lines.join('\n')}}`))
  }
}

export default OneLineError
