import BaseView from './base.mjs'
import mixin from './node_modules/create-mixin/index.mjs'
import OneLineError from './one-line-error.mjs'
import NoSkips from './no-skips.mjs'

function build (options = {}) {
  let ViewClass = BaseView
  if (options.noSkips) {
    ViewClass = mixin(NoSkips)(ViewClass)
  }
  if (options.oneLineError) {
    ViewClass = mixin(OneLineError)(ViewClass)
  }
  return ViewClass
}

export default build
