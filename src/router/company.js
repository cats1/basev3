import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'visitor',
  	component: _import('emporder/layOut'),
  	children: [
  	  { path: '/', name: 'index', component: _import('home/managerLeftRight') },
  	  { path: '/data', name: 'data', component: _import('home/components/dataControl') },
  	  { path: '/invite', name: 'invite', component: _import('company/invite') }
      {path: '/history',name: 'history',component: _import('history/layOut')}
  	]
  }]
})
