'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://www.coolvisit.top/qcvisitBase"',
  BASE_LINK: '"http://www.coolvisit.top/base"',
  HOST: '"www.coolvisit.top"',
  BASE_VERSION: 'v2.1.0'
})
