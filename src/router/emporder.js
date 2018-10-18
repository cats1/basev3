import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
    path: '/',
    component: resolve => require(['@/components/emporder/layOut'], resolve),
    children: [{
        path: '/',
        name: 'order',
        component: resolve => require(['@/components/emporder/components/danOrder'],resolve),
        meta: {
          title: 'order'
        }
      },
      {
        path: '/dot',
        name: 'dot',
        component: resolve => require(['@/components/emporder/components/dotOrder'],resolve),
        meta: {
          title: 'order'
        }
      },
      {
        path: '/list',
        name: 'list',
        component: resolve => require(['@/components/emporder/orderList'],resolve),
        meta: {
          title: 'orderList'
        }
      },
      {
        path: '/empmeeting',
        name: 'empmeeting',
        component: resolve => require(['@/components/emporder/empmeeting'],resolve),
        meta: {
          title: 'meeting'
        }
      },
      {
        path: '/mdetail/:mid',
        name: 'empmdetail',
        component: resolve => require(['@/components/meeting/meetingDetail'],resolve),
        meta: {
          title: 'meeting'
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
