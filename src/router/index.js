import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)
export default new Router({
  routes: [{
    path: '/',
    component: _import('home/layOut'),
    children: [{
        path: '',
        name: 'index',
        component: _import('home/managerLeftRight'),
        meta: {
          title: 'visitor'
        }
      },
      {
        path: 'data',
        name: 'data',
        component: _import('home/components/dataControl'),
        meta: {
          title: 'data'
        }
      }
    ]
  }, {
    path: '/emp',
    component: _import('home/layOut'),
    children: [{
        path: '/',
        name: 'emplist',
        component: _import('emplist/index'),
        meta: {
          title: 'employee'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: _import('emplist/roleList'),
        meta: {
          title: 'role'
        }
      },
      {
        path: '/visitlist/:vtype?',
        name: 'visitlist',
        component: _import('visitlist/layOut'),
        meta: {
          title: 'visitlist'
        }
      },
      {
        path: '/blacklist',
        name: 'blacklist',
        component: _import('black/layOut'),
        meta: {
          title: 'backlist'
        }
      },
      {
        path: '/whitelist',
        name: 'whitelist',
        component: _import('white/layOut'),
        meta: {
          title: 'whitelist'
        }
      },
      {
        path: '/overtime',
        name: 'overtime',
        component: _import('workovertime/layOut'),
        meta: {
          title: 'overtime'
        }
      }
    ]
  }, {
    path: '/notice',
    component: _import('home/layOut'),
    children: [{
      path: '',
      name: 'notice',
      component: _import('noticepage/layOut'),
      meta: {
        title: 'notice'
      }
    }]
  }, {
    path: '/setting',
    component: _import('home/layOut'),
    children: [{
        path: '/pad',
        name: 'pad',
        component: _import('pad/layOut'),
        meta: {
          title: 'pad'
        }
      },
      {
        path: '/reserve',
        name: 'reserve',
        component: _import('reserve/layOut'),
        meta: {
          title: 'reserve'
        }
      },
      {
        path: '/approve',
        name: 'approve',
        component: _import('reserve/components/approvePage'),
        meta: {
          title: 'approve'
        }
      }, {
        path: '/calendar',
        name: 'calendar',
        component: _import('reserve/setCalendar'),
        meta: {
          title: 'calendar'
        }
      },
      {
        path: '/key',
        component: _import('key/layOut'),
        children: [{
            path: '',
            name: 'group',
            component: _import('key/components/equipGroup'),
            meta: {
              title: 'key'
            }
          },
          {
            path: 'detail/:egid?',
            name: 'detail',
            component: _import('key/components/equipDetail'),
            meta: {
              title: 'key'
            }
          },
          {
            path: 'list',
            name: 'list',
            component: _import('key/components/equipList'),
            meta: {
              title: 'key'
            }
          },
          {
            path: 'listd/:eid?',
            name: 'listd',
            component: _import('key/components/detail'),
            meta: {
              title: 'key'
            }
          },
          {
            path: 'record',
            name: 'record',
            component: _import('key/components/record'),
            meta: {
              title: 'key'
            }
          }
        ]
      }
    ]
  }, {
    path: '/meeting',
    component: _import('home/layOut'),
    children: [{
        path: '/',
        name: 'meeting',
        component: _import('meeting/meetingList'),
        meta: {
          title: 'meeting'
        }
      },
      {
        path: '/mdetail/:mid',
        name: 'mdetail',
        component: _import('meeting/meetingDetail'),
        meta: {
          title: 'meeting'
        }
      }
    ]
  }, {
    path: '/account',
    component: _import('home/layOut'),
    children: [{
      path: '/',
      component: _import('account/layOut'),
      children: [{
          path: '',
          name: 'base',
          component: _import('account/base'),
          meta: {
            title: 'account'
          }
        },
        {
          path: 'safe',
          name: 'safe',
          component: _import('account/safe'),
          meta: {
            title: 'account'
          }
        },
        {
          path: 'stage',
          name: 'stage',
          component: _import('account/stage'),
          meta: {
            title: 'account'
          }
        },
        {
          path: 'coms',
          name: 'coms',
          component: _import('account/companys'),
          meta: {
            title: 'account'
          }
        }
      ]
    }]
  }, {
    path: '/history',
    component: _import('home/layOut'),
    children: [{
      path: '/',
      name: 'history',
      component: _import('history/layOut'),
      meta: {
        title: 'history'
      }
    }]
  }, {
    path: '*',
    name: '404',
    component: _import('error/404One'),
    meta: {
      title: '404'
    }
  }, {
    path: '/takephoto',
    name: 'takephoto',
    component: _import('photo/takePhoto')
  },, {
    path: '/cropper',
    name: 'cropper',
    component: _import('cropper/vueCropper')
  }]
})
