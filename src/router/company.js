import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: _import('company/layOut'),
  	children: [
  	  { path: '/', name: 'index', component: _import('home/managerLeftRight'),meta: {
        title: 'visitor'
      }},
  	  { path: '/data', name: 'data', component: _import('home/components/dataControl'),meta: {
        title: 'data'
      } },
  	  { path: '/invite', name: 'invite', component: _import('company/invite'),meta: {
        title: 'invite'
      } },
      {path: '/history',name: 'history',component: _import('history/layOut'),meta: {
        title: 'history'
      }}
  	]
  },{
    path: '*',
    name: '404',
    component: _import('error/404One'),
    meta: {
      title: '404'
    }
  }]
})
