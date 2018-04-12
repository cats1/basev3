import Vue from 'vue'
import Router from 'vue-router'
import { guideOne, guideTwo, guideThree, guideFour, guideFive } from '@/views/guide/components'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
    path: '/',
    name: 'guideOne',
    component: guideOne
  },{
    path: '/two',
    name: 'guideTwo',
    component: guideTwo
  },{
    path: '/three/:id?',
    name: 'guideThree',
    component: guideThree
  },{
    path: '/four',
    name: 'guideFour',
    component: guideFour
  },{
    path: '/five',
    name: 'guideFive',
    component: guideFive
  }]
})