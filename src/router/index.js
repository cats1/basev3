import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)
export default new Router({
  routes: [{
  	path: '/',
  	name: 'visitor',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/',name: 'index',component: _import('home/managerLeftRight')},
  	  {path: '/data',name: 'data',component: _import('home/components/dataControl')}
  	]
  },{
  	path: '/emp',
  	name: 'emp',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/',name: 'emplist',component: _import('emplist/index')},
	    {path: '/role',name: 'role', component: _import('emplist/roleList')},
  	  {path: '/visitlist/:vtype?',name: 'visitlist',component: _import('visitlist/layOut')},
  	  {path: '/blacklist',name: 'blacklist',component: _import('black/layOut')}
  	]
  },{
  	path: '/notice',
  	name: 'emp',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/',name: 'notice',component: _import('noticepage/layOut')}
  	]
  },{
  	path: '/setting',
  	name: 'emp',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/pad',name: 'pad',component: _import('pad/layOut')},
  	  {path: '/reserve',name: 'reserve',component: _import('reserve/layOut')},
      {path: '/approve',name: 'approve',component: _import('reserve/components/approvePage')},
  	  {path: '/key',name: 'key',component: _import('key/layOut'),children:[
  	  	{path: '/',name: 'group',component: _import('key/components/equipGroup')},
  	  	{path: '/list',name: 'list',component: _import('key/components/equipList')},
  	  	{path: '/record',name: 'record',component: _import('key/components/record')}
  	  ]}
  	]
  },{
  	path: '/meeting',
  	name: 'meeting',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/',name: 'meeting',component: _import('meeting/meetingList')},
  	  {path: '/mdetail/:mid',name: 'mdetail',component: _import('meeting/meetingDetail')}
  	]
  },{
  	path: '/account',
  	name: 'account',
  	component: _import('home/layOut'),
  	children: [
  	  {path: '/',name: 'account',component: _import('account/layOut'),children:[
  	    {path: '/base',name: 'base',component: _import('account/base')},
  	    {path: '/safe',name: 'safe',component: _import('account/safe')},
  	    {path: '/stage',name: 'stage',component: _import('account/stage')},
  	    {path: '/coms',name: 'coms',component: _import('account/companys')}
  	  ]}
  	]
  },{
    path: '/history',
    name: 'history',
    component: _import('home/layOut'),
    children: [
      {path: '/',name: 'history',component: _import('history/layOut')}
    ]
  },{
    path: '*',
    name: '404',
    component: _import('error/404')
  }]
})