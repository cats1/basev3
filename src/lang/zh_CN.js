export default {
  test: '咳咳',
  loginselect: [{
    name: '管理员登录',
    type: 0
  },{
    name: '超级管理员登录',
    type: 1
  },{
    name: '入驻企业登录',
    type: 2
  },{
    name: '员工登录',
    type: 3
  },{
    name: '前台登录',
    type: 4
  }],
  validPassword: {
    tip1: '密码格式不正确',
    tip2: '密码长度不小于6位'
  },
  validEmail: {
    tip1: '邮箱格式不正确'
  },
  imgcode: {
    tip1: '验证码不能为空'
  },
  validphone: {
    tip1: '手机号格式不正确',
    tip2: '手机号不能为空'
  },
  validStage: {
    tip1: '账号不能为空'
  },
  login: {
    title: '管理员登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    forgot: {
      title: '忘记密码？'
    },
    or: '或者',
    signup: '企业注册',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  superLogin:{
    title: '超级管理员登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    checkNameTip: '超级账号格式不正确,以LFT_开头',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  companyLogin:{
    title: '入驻企业登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  empLogin:{
    title: '员工登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  stageLogin:{
    title: '前台登录',
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
    27: '无效的token',
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
  },{
    name: '会议',
    dirname: 'meeting',
    link: 'meeting.html',
    children: []
  }],
  homepage:{
    name: '官网首页',
    link: '#'
  },
  downlist:[{
    name: '账号管理',
    dirname: 'account',
    link: 'account.html'
  },{
    name: '退出账号',
    dirname: null,
    link: null
  }],
  superdown:[{
    name: '修改密码',
    dirname: null,
    link: null
  },{
    name: '退出账号',
    dirname: 'signout',
    link: null
  }],
  footer: {
    ftext1: '版权所有',
    ftext2: '南京访客乐网络科技有限公司. 保留一切权利.',
    flink: '苏ICP备15058768号' 
  }
}
