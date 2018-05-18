import Vue from 'vue'
import Router from 'vue-router'
import {danOrder,dotOrder} from '@/components/emporder/components'
import orderList from '@/components/emporder/orderList'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'visitor',
  	component: _import('emporder/layOut'),
  	children: [
  	  {path: '/',name: 'order',component:danOrder,meta: {
        title: 'order'
      }},
      {path: '/dot',name: 'dot',component:dotOrder,meta: {
        title: 'order'
      }},
      {path: '/list',name: 'list',component:orderList,meta: {
        title: 'orderList'
      }},
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