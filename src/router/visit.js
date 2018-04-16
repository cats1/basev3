import Vue from 'vue'
import Router from 'vue-router'
import projectList from '@/components/visitlist/projectList'
import comList from '@/components/visitlist/comList'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'pro',
  	component: projectList
  },{
  	path: '/com',
  	name: 'com',
  	component: comList
  }]
})