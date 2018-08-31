'use strict'
const merge = require('webpack-merge')
const base = require('./eastbase')//东威
//const base = require('./ccbbase')//建行
module.exports = merge(base, {
  NODE_ENV: '"production"',
  /*BASE_API: '"http://www.coolvisit.top/qcvisitBase"',
  BASE_LINK: '"http://www.coolvisit.top/global"',
  HOST: '"www.coolvisit.top"',
  BASE_VERSION: 'v2.1.0'*/
})
