import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

// import Index from '@/views/index'

Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [{
      path: '/',
      component: _import('index/index'),
      name: 'index',
      meta: { title: 'index', icon: 'index', noCache: true }
    }]
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
/* export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
}) */
