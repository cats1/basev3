import Vue from 'vue'
import Router from 'vue-router'
import { equipGroup, equipDetail, equipList, detail, record } from '@/views/key/components'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: equipGroup
  },{
    path: '/group',
    component: equipGroup
  },{
    path: '/detail/:type?',
    component: equipDetail
  },{
  	path: '/list',
  	component: equipList
  },{
    path: '/listd/:type?',
    component: detail
  },{
  	path: '/record',
  	component: record
  }]
})