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
  	  {path: '/',name: 'order',component:danOrder},
      {path: '/dot',name: 'dot',component:dotOrder},
      {path: '/list',name: 'list',component:orderList},
      {path: '/history',name: 'history',component: _import('history/layOut')}
  	]
  }]
})