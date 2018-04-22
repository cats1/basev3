import Vue from 'vue'
import Router from 'vue-router'
import {meetingList,meetingDetail} from '@/components/meeting'
Vue.use(Router)

export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: meetingList
  },{
  	path: '/mdetail/:mid',
  	name: 'mdetail',
  	component: meetingDetail
  }]
})
