import Vue from 'vue'
import Router from 'vue-router'
import { equipGroup, equipDetail, equipList, detail, record } from '@/components/key/components'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
    name: 'equipgroup',
  	component: equipGroup
  },{
    path: '/group',
    name: 'equipgroup',
    component: equipGroup
  },{
    path: '/detail/:egid?',
    name: 'detail',
    component: equipDetail
  },{
  	path: '/list',
    name: 'equiplist',
  	component: equipList
  },{
    path: '/listd/:eid?',
    name: 'listd',
    component: detail
  },{
  	path: '/record',
    name: 'keyrecord',
  	component: record
  }]
})