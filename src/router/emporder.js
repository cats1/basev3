import Vue from 'vue'
import Router from 'vue-router'
import layOut from '@/components/emporder/layOut'
import order from '@/components/emporder/order'
import {danOrder,dotOrder} from '@/components/emporder/components'
import orderList from '@/components/emporder/orderList'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'order',
  	component: layOut,
  	children: [
  	{path: '/',name: 'order',component:danOrder},
  	{path: '/dot',name: 'dot',component:dotOrder},
    {path: '/list',name: 'list',component:orderList}]
  }]
})