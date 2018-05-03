'use strict'
const merge = require('webpack-merge')
const base = require('./base')
module.exports = merge(base, {
  NODE_ENV: '"production"',
  BASE_API: '"http://www.coolvisit.top/qcvisitBase"',
  BASE_LINK: '"http://www.coolvisit.top/base"',
  HOST: '"www.coolvisit.top"',
  BASE_VERSION: 'v2.1.0'
})
