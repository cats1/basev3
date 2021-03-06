import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	name: 'index',
  	component: _import('signup/layOut'),
    meta: {
      title: 'signup'
    }
  },{
    path: '/guide',
    name: 'guide',
    component: _import('signup/guideShow'),
    children: [
      {path: '/',name: 'guide1',component: _import('signup/components/guideOne'),meta: {
      title: 'signup'
    }},
      {path: '/guide2',name: 'guide2',component: _import('signup/components/guideTwo'),meta: {
      title: 'signup'
    }},
      {path: '/guide3',name: 'guide3',component: _import('signup/components/guideThree'),meta: {
      title: 'signup'
    }},
      {path: '/guide4',name: 'guide4',component: _import('signup/components/guideFour'),meta: {
      title: 'signup'
    }},
      {path: '/done',name: 'guide5',component: _import('signup/components/guideFive'),meta: {
      title: 'signup'
    }}
    ]
  }]
})