export default {
  test: '咳咳',
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  responseNote: {
    1: '无效的用户',
    2: '无效的密码',
    3: '用户已存在',
    4: '邮箱已被占用',
    5: '用户不可用',
    6: '用户未更新',
    7: '无效的验证码',
    8: '昵称不可用',
    119: '验证码无效'
  },
  navlist: [{
    name: '首页',
    dirname: 'index',
    link: 'index.html',
    children: []
  },{
    name: '人员',
    dirname: 'employee',
    link: 'employee.html',
    children: [{
      name: '公司员工',
      dirname: 'employee',
      link: 'employee.html',
      children: []
    },{
      name: '常驻访客',
      dirname: 'visitlist',
      link: 'visitlist.html',
      children: []
    },{
      name: '黑名单',
      dirname: 'blacklist',
      link: 'blacklist.html',
      children: []
    }]
  },{
    name: '通知',
    dirname: 'notice',
    link: 'notice.html',
    children: []
  },{
    name: '自定义设置',
    dirname: 'setting',
    link: 'setting.html',
    children: [{
      name: '前台设置',
      dirname: 'pad',
      link: 'pad.html',
      children: []
    },{
      name: '预约邀请',
      dirname: 'reserve',
      link: 'reserve.html',
      children: []
    },{
      name: '智能门禁',
      dirname: 'key',
      link: 'key.html',
      children: []
    }]
  },]
}
