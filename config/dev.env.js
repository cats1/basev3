'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://visit.eastech.com/qcvisit"',
  BASE_LINK: '"http://visit.eastech.com/console"',
  HOST: '"visit.eastech.com"',
  BASE_VERSION: 'v2.1.0'
})
