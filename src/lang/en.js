export default {
  signup: {
    title: 'signup',
    desc: '马上体验更智能的访客管理系统',
    button: 'signup'
  },
  guide: {
    guide1: {
      title: '欢迎加入来访通',
      desc: '您只需完成以下操作，即可对酷访通进行自定义设置。如需帮助，请点击页面右侧“问题咨询”',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：添加员工',
      btn: 'next'
    },
    guide2: {
      title: '添加员工信息',
      desc: '添加员工后即能体验我们最强大的功能：自动通知员工有客来访。请至少添加一条员工信息。支持RTX、员工通讯录Excel表格导入，更推荐您尝试手动添加，直接将员工信息录入后台。',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：登记设置',
      btn: 'next'
    },
    guide3: {
      title: '登记内容设置',
      desc: '您的访客将在iPad页面进行登记，我们为您提供以下登记内容，您可以对其进行个性化设置',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：通知设置',
      btn: 'next'
    },
    guide4: {
      title: '通知方式设置',
      desc: '我们为您提供微信、邮件、钉钉、RTX、短信五种通知方式，点击右侧开关，设置员工接收通知方式',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：迎接来访者',
      btn: 'next'
    },
    guide5: {
      title: 'Pad端设置',
      desc: '您的访客将在iPad页面进行登记，我们为您提供以下登记内容，您可以对其进行个性化设置',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：迎接来访者',
      btn: '进入后台管理'
    }
  },
  formCheck: {
    validPassword: {
      tip1: '密码格式不正确',
      tip2: '密码长度不小于6位',
      tip3: '密码不能为空'
    },
    validEmail: {
      tip1: '邮箱格式不正确',
      success: '邮件发送成功！',
      holder: '邮箱'
    },
    validphone: {
      tip1: '手机号格式不正确',
      tip2: '手机号不能为空',
      holder: '手机号码'
    },
    validName: {
      tip1: '不能为空',
      tip2: '包含非法字符'
    },
    validEmpName: {
      holder: 'empname'
    }
  },
  notice: {
    weixin: {
      title: 'webchat',
      desc: '当有访客签到时，通过微信服务号"来访通"通知员工,员工需提前在服务号使用通讯录中的手机号注册。',
    },
    email: {
      title: 'email',
      desc: '当有访客签到时，通过邮件通知员工'
    },
    sms: {
      title: 'message',
      desc: '短信通知员工，以及快捷回复时，短信通知访客'
    },
    yuyin: {
      title: 'yuyin telephone',
      desc: '当访客在前台Pad签到时，通过语音电话通知受访员工'
    },
    dd: {
      title: 'dd',
      desc: '当有访客签到时，通过钉钉通知员工',
      tip: '如果要开启此项通知方式，请点击此处设置导入通讯录方式'
    },
    rtx: {
      title: 'RTX',
      desc: '当有访客签到时，通过RTX通知员工',
      tip: '如果要开启此项通知方式，请点击此处设置导入通讯录方式'
    }
  },
  loginselect: [{
    name: 'manager login',
    type: 0
  },{
    name: 'super login',
    type: 1
  },{
    name: 'company login',
    type: 2
  },{
    name: 'emp login',
    type: 3
  },{
    name: 'stage login',
    type: 4
  }],
  validPassword: {
    tip1: '密码格式不正确',
    tip2: '密码长度不小于6位'
  },
  validEmail: {
    tip1: '邮箱格式不正确',
    success: '邮件发送成功！'
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
    title: 'Manager Login',
    logIn: 'login',
    username: '账号',
    password: '密码',
    forgot: {
      title: 'forgot password？',
      page: {
        title: 'forgot password',
        desc: '输入您的电子邮件地址，我们会送您如何重置密码的说明',
        btn: '发送重置链接'
      }
    },
    or: 'or',
    signup: '企业注册',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  superLogin:{
    title: 'super login',
    logIn: 'login',
    username: '账号',
    password: '密码',
    checkNameTip: '超级账号格式不正确,以LFT_开头',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  companyLogin:{
    title: 'company login',
    logIn: 'login',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  empLogin:{
    title: 'emp login',
    logIn: 'login',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  stageLogin:{
    title: 'stage login',
    logIn: 'login',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  responseNote: {
    1: 'invalid user',    
    2: '无效的密码',
    3: '用户已存在',
    4: '邮箱已被占用',
    5: '用户不可用',
    6: '用户未更新',
    7: '无效的验证码',
    8: '昵称不可用',
    27: '无效的token',
    46: '公司已存在',
    119: 'validationCode failed',
  },
  navlist: [{
    name: 'index',
    dirname: 'index',
    link: 'index.html',
    children: []
  },{
    name: 'emp',
    dirname: 'employee',
    link: 'employee.html',
    children: [{
      name: 'emp',
      dirname: 'employee',
      link: 'employee.html',
      children: []
    },{
      name: 'visitor',
      dirname: 'visitlist',
      link: 'visitlist.html',
      children: []
    },{
      name: 'backlist',
      dirname: 'blacklist',
      link: 'blacklist.html',
      children: []
    }]
  },{
    name: 'notice',
    dirname: 'notice',
    link: 'notice.html',
    children: []
  },{
    name: 'setting',
    dirname: 'setting',
    link: 'setting.html',
    children: [{
      name: 'pad',
      dirname: 'pad',
      link: 'pad.html',
      children: []
    },{
      name: 'reserve',
      dirname: 'reserve',
      link: 'reserve.html',
      children: []
    },{
      name: 'doorlock',
      dirname: 'key',
      link: 'key.html',
      children: []
    }]
  },{
    name: 'meeting',
    dirname: 'meeting',
    link: 'meeting.html',
    children: []
  }],
  homepage:{
    name: 'homepage',
    link: '#'
  },
  downlist:[{
    name: 'account',
    dirname: 'account',
    link: 'account.html'
  },{
    name: 'signout',
    dirname: 'signout',
    link: null
  }],
  superdown:[{
    name: 'update password',
    dirname: null,
    link: null
  },{
    name: 'signout',
    dirname: 'signout',
    link: null
  }],
  footer: {
    ftext1: 'copyright',
    ftext2: '南京访客乐网络科技有限公司. 保留一切权利.',
    flink: '苏ICP备15058768号' 
  }
}

