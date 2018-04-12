import Vue from 'vue'
import Router from 'vue-router'
import svgIcons from '@/views/index/svg-icons/index'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  //mode: 'history', // require service support
  routes: [{
  	path: '/',
  	component: _import('index/components/manager')
  },{
  	path: '/icon',
  	component: svgIcons,
  	name: 'icons',
    meta: { title: 'icons', icon: 'icon', noCache: true }
  }]
})