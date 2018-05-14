'use strict'
const merge = require('webpack-merge')
const base = require('./base')
module.exports = merge(base, {
  NODE_ENV: '"production"',
  BASE_API: '"http://visit.eastech.com/qcvisit"',
  BASE_LINK: '"http://visit.eastech.com/console"',
  HOST: '"visit.eastech.com"',
  BASE_VERSION: 'v2.1.0'
})
