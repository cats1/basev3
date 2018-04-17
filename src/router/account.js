import Vue from 'vue'
import Router from 'vue-router'
import base from '@/components/account/base'
import safe from '@/components/account/safe'
import stage from '@/components/account/stage'
import coms from '@/components/account/companys'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
    path: '/',
    redirect: '/base'
  },{
  	path: '/base',
  	name: 'base',
  	component: base
  },{
  	path: '/safe',
  	name: 'safe',
  	component: safe
  },{
  	path: '/stage',
  	name: 'stage',
  	component: stage
  },{
  	path: '/coms',
  	name: 'coms',
  	component: coms
  }]
})