import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
    path: '/',
    component: resolve => require(['@/components/empm/layOut'], resolve),
    children: [{
        path: '/',
        name: 'order',
        component: resolve => require(['@/components/empm/components/danOrder'],resolve),
        meta: {
          title: 'order'
        }
      },
      {
        path: '/list',
        name: 'list',
        component: resolve => require(['@/components/empm/orderList'],resolve),
        meta: {
          title: 'orderList'
        }
      },
      {
        path: '/history',
        name: 'history',
        component: resolve => require(['@/components/history/layOut'],resolve),
        meta: {
          title: 'history'
        }
      }
    ]
  }, {
    path: '*',
    name: '404',
    component: resolve => require(['@/components/error/404One'],resolve),
    meta: {
      title: '404'
    }
  }]
})
