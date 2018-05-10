import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)
export default new Router({
  routes: [{
  	path: '/',
  	name: 'super',
  	component: _import('super/layOut'),
  	children: []
  }]
})