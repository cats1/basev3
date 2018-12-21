import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [
    {
        path: '/',
        name: 'index',
        component: resolve => require(['@/components/empm/loading'],resolve),
        meta: {
          title: 'index'
        }
    },
    {
        path: '/order',
        name: 'order',
        component: resolve => require(['@/components/empm/danPage'],resolve),
        meta: {
          title: 'order'
        }
    },{
	    path: '*',
	    name: '404',
	    component: resolve => require(['@/components/error/404One'],resolve),
	    meta: {
	      title: '404'
	    }
    }]
})