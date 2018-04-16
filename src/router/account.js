import Vue from 'vue'
import Router from 'vue-router'
import base from '@/components/account/base'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'base',
  	component: base
  }]
})