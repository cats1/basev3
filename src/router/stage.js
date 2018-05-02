import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: _import('stage/index')
  },{
  	path: '/data',
  	component: _import('home/components/dataControl')
  }]
})