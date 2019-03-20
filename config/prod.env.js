'use strict'
const merge = require('webpack-merge')
//const base = require('./base')
//const base = require('./wazx')//网安中心
//const base = require('./eastbase')//东威
//const base = require('./suodisi')//索迪斯
//const base = require('./ccbbase')//建行
//const base = require('./jiateke')//加特可
//const base = require('./yameiya')//亚美亚
//const base = require('./guomao')//国药
//const base = require('./shenzhongtongdao')//深中通道
//const base = require('./yjly')//益江粮油
//const base = require('./sogo')//搜狗
const base = require('./epson')//爱普生
//const base = require('./shzl')//上海震亮
module.exports = merge(base, {
  NODE_ENV: '"production"',
  /*BASE_API: '"http://www.coolvisit.top/qcvisitBase"',
  BASE_LINK: '"http://www.coolvisit.top/global"',
  HOST: '"www.coolvisit.top"',
  BASE_VERSION: 'v2.1.0'*/
})
