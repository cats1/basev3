import Vue from 'vue'
import Router from 'vue-router'
import projectList from '@/components/visitlist/projectList'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: projectList
  }]
})