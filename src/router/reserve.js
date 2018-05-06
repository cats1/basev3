import Vue from 'vue'
import Router from 'vue-router'
import reserve from '@/components/reserve/reserve'
import approve from '@/components/reserve/components/approvePage'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'reserve',
  	component: reserve
  },{
  	path: '/approve',
  	name: 'approve',
  	component: approve
  }]
})