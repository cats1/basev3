import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'stage',
  	component: _import('home/managerLeftRight'),
    meta: {
      title: 'visitor'
    }
  },{
  	path: '/data',
  	name: 'sdata',
  	component: _import('home/components/dataControl'),
    meta: {
      title: 'data'
    }
  },{
    path: '*',
    name: '404',
    component: _import('error/404One'),
    meta: {
      title: '404'
    }
  }]
})