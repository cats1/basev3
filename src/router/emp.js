import Vue from 'vue'
import Router from 'vue-router'
import layOut from '@/components/emplist/layOut'
import groupList from '@/components/emplist/groupList'
import roleList from '@/components/emplist/roleList'
import empList from '@/components/emplist/empList'
import exportAddressBook from '@/components/emplist/components/exportAddressBook'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/group',
  	name: 'group',
  	component: groupList
  },{
    path: '/emplist',
    name: 'emplist',
    component: empList
  },{
    path: '/exportset',
    name: 'exportset',
    component: exportAddressBook
  },{
  	path: '/role',
  	name: 'role',
  	component: roleList
  }]
})