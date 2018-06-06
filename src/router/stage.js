import Vue from 'vue'
import Router from 'vue-router'
import managerLeftRight from '@/components/home/managerLeftRight'
import dataControl from '@/components/home/components/dataControl'
import error from '@/components/error/404One'
//const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  mode: 'hash', // require service support
  routes: [{
  	path: '/',
  	name: 'stage',
  	component: managerLeftRight,
    meta: {
      title: 'visitor'
    }
  },{
  	path: '/data',
  	name: 'sdata',
  	component: dataControl,
    meta: {
      title: 'data'
    }
  },{
    path: '*',
    name: '404',
    component: error,
    meta: {
      title: '404'
    }
  }]
})