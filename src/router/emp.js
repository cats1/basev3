import Vue from 'vue'
import Router from 'vue-router'
import groupList from '@/components/emplist/groupList'
import roleList from '@/components/emplist/roleList'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'group',
  	component: groupList
  },{
  	path: '/role',
  	name: 'role',
  	component: roleList
  }]
})