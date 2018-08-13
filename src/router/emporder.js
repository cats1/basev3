import Vue from 'vue'
import Router from 'vue-router'
import {danOrder,dotOrder} from '@/components/emporder/components'
import orderList from '@/components/emporder/orderList'
import empmeeting from '@/components/emporder/empmeeting'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
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
      {path: '/empmeeting',name: 'empmeeting',component:empmeeting,meta: {
        title: 'meeting'
      }},
      {
        path: '/mdetail/:mid',
        name: 'empmdetail',
        component: _import('meeting/meetingDetail'),
        meta: {
          title: 'meeting'
        }
      },
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