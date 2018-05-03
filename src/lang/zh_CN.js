export default {
  signup: {
    title: '注册',
    desc: '马上体验更智能的访客管理系统',
    button: '注册'
  },
  meeting: {},
  nodata: '暂无数据',
  dataM: '数据管理',
  vstatus: ['已发送','已签到','已查看','已接受','已拒绝','已签出','未授权','已授权','已预约','已过期'],
  vtype: ['签到访客','预约访客','邀请访客','常驻访客'],
  vnum: ['访客总数','离开人数','正在拜访人数','总数','签到人数','未到人数','访客'],
  vdate: ['开始日期','结束日期','选择日期'],
  vtime: ['开始时间','结束时间'],
  visitor: {
    vname: '访客姓名',
    vphone: '访客手机号',
    vcom: '访客公司',
    ename: '受访人姓名',
    ephone: '受访人手机号',
    ecom: '受访人手机号',
    ordertime: '预约时间',
    visittime: '来访时间',
    leavetime: '离开时间',
    followPeople: '随访人员',
    list: '访客详细信息',
    manager: '主管',
    editEmp: '编辑员工'
  },
  role: {
    tip: '请先选择角色组',
    tip1: '选择角色组',
    tip2: '请选择角色'
  },
  export: {
    title: '访客列表导出项设置'
  },
  itype: [{
    label: '面试',
    value: 0
  },{
    label: '商务',
    value: 1
  }],
  timetype: [{
    label: '天数',
    value: 0
  },{
    label: '次数',
    value: 1
  }],
  signStatus: ['已签到','已签出','已预约','已过期','已发送','已查看','已接受','已拒绝','已授权','未授权'],
  checkVtype: ['全部','拜访者姓名','受访者姓名','拜访事由','电话','公司','门岗'],
  record: '共找到',
  record1: '条，关于',
  record2: '记录',
  version: [{
    type: 0,
    name: '免费版'
  },{
    type: [1,2],
    name: '商务版'
  },{
    type: 3,
    name: '工厂版'
  }],
  endTimeText: '到期',
  guide: {
    guide1: {
      title: '欢迎加入来访通',
      desc: '您只需完成以下操作，即可对酷访通进行自定义设置。如需帮助，请点击页面右侧“问题咨询”',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：添加员工',
      btn: '下一步'
    },
    guide2: {
      title: '添加员工信息',
      desc: '添加员工后即能体验我们最强大的功能：自动通知员工有客来访。请至少添加一条员工信息。支持RTX、员工通讯录Excel表格导入，更推荐您尝试手动添加，直接将员工信息录入后台。',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：登记设置',
      btn: '下一步'
    },
    guide3: {
      title: '登记内容设置',
      desc: '您的访客将在iPad页面进行登记，我们为您提供以下登记内容，您可以对其进行个性化设置',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：通知设置',
      btn: '下一步'
    },
    guide4: {
      title: '通知方式设置',
      desc: '我们为您提供微信、邮件、钉钉、RTX、短信五种通知方式，点击右侧开关，设置员工接收通知方式',
      inputTitle: '填写公司信息',
      inputPlaceholder: '公司名备注（最多六个字）',
      inputDesc: '提示：公司名备注用于微信以及访客贴纸',
      next: '接下来：迎接来访者',
      btn: '下一步'
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
  form: {
    name: {
      text: '姓名',
      text1: '拜访者',
      text2: '被访者',
      text3: '昵称',
      text4: '操作者',
      text5: '操作者类型'
    },
    depart: {
      text: '部门'
    },
    phone: {
      text: '手机号',
      text1: '联系方式',
      text2: '被访者联系方式',
      text3: '电话',
      text4: '电话号码'
    },
    idnum: {
      text: '身份证号',
      text1: '证件号码',
      text2: '证件扫描件'
    },
    email: {
      text: '邮箱',
      checktext: '订阅邮件',
      tiptitle: '您确定不再接收邮件吗？',
      tipdesc: '勾选此项表明以后<strong>不再</strong>接受来访通的任何邮件'
    },
    company: {
      text: '公司名称',
      text2: '公司',
      text1: '办公地点',
      text3: '所属公司'
    },
    companypro: {
      text: '公司简称',
      text2: '工作单位'
    },
    position: {
      text: '职位',
      text1: '工号'
    },
    password: {
      oldtext: '原密码',
      newtext: '新密码',
      retext: '确认新密码',
      text1: '密码'
    },
    stageaccount: {
      text: '验证端账号'
    },
    count: {
      text: '来访人数',
      text1: '随访人员清单'
    },
    remark: {
      text: '备注'
    },
    time: {
      text6: '时间',
      text: '签到时间',
      text1: '签出时间',
      text2: '预约时间',
      text3: '邀请时间',
      text4: '服务期限',
      text5: '操作时间',
      text7: '有效期'
    },
    gate: {
      text: '关联闸机',
      tip: '请选择闸机组'
    },
    photo: {
      tip: '请上传头像'
    },
    visitType: {
      text: '来访事由'
    }
  },
  tablehead: ['序号','会议名称','时间','发起人','主题','二维码','手机号','事由','发起时间','公司','状态','发送状态'],
  phoneIdnum: {
    text: '*身份证与手机号二选一',
    tips: '手机号与身份证号至少填一项'
  },
  sex: ['男','女'],
  idNumTip: ['验证通过!','身份证号码位数不对!',"身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"],
  formCheck: {
    validPassword: {
      tip1: '密码格式不正确',
      tip2: '密码长度不小于6位',
      tip3: '密码不能为空',
      tip4: '请输入密码',
      tip5: '两次输入密码不一致',
      tip6: '请再次输入密码'
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
    validCompany: {
      tip1: '公司名称不能为空',
      tip2: '部门不能为空'
    },
    validCompanyPro: {
      tip1: '公司简称不能为空',
      tip2: '最长6个字符'
    },
    validName: {
      tip1: '姓名不能为空',
      tip2: '包含非法字符',
      tip3: '姓名不能为空',
      tip4: '请选择会议发起人',
      tip5: '员工姓名不能为空'
    },
    validEmpName: {
      holder: '员工姓名'
    },
    validAccont: {
      tip1: '请输入账号'
    },
    time: {
      tip1: '请选择时间',
      tip2: '日期不能为空',
      minute: '分钟',
      day: '天',
      times: '次'
    },
    meeting: {
      tip1: '请填写主题'
    },
    remark: {
      tip1: '请填写备注'
    }
  },
  people: {
    emp: '员工',
    visit: '访客',
    inviteVisit: '邀请访客',
    orderVisit: '签到访客',
    and: '和'
  },
  status: {
    on: '启用',
    off: '停用',
    text: '状态',
    startText: '开启状态'
  },
  key: {
    htitle: '设备管理',
    title: '设备信息',
    ctitle: '设备组员',
    ctitle1: '设备列表',
    title1: '开启日志',
    ctitle2: '设备开启记录',
    addGroup: '添加设备组',
    updateGroup: '修改设备组',
    groupName: '组名称',
    groupId: '组编号',
    groupRule: '使用规则',
    groupAuth: '访问权限',
    groupStatus: '授权后默认开启',
    addEquip: '添加设备',
    equipeName: '设备名称',
    equipMark: '设备标识',
    extendMark: '扩展标识',
    doorNumber: '门号',
    equipIp: '设备IP',
    equipPort: '设备端口号',
    headNumber: '读头编号',
    equipDist: '设备组分配'
  },
  black: {
    wins: {
      title:'新增黑名单'
    }
  },
  pad: {
    usualSet: '通用设置',
    padSet: 'pad设置',
    scolor: '选择颜色',
    inputColor: '输入色值'
  },
  notice: {
    tip: {
      title: '提醒通知',
      desc: '点击右侧开关，设置员工接收通知方式'
    },
    black: {
      title: '黑名单开关',
      desc: '黑名单功能打开后，黑名单中的人将无法进行预约，登记操作。',
    },
    weixin: {
      title: '微信',
      desc: '当有访客签到时，通过微信服务号"来访通"通知员工,员工需提前在服务号使用通讯录中的手机号注册。',
    },
    email: {
      title: '邮件',
      desc: '当有访客签到时，通过邮件通知员工',
      ptitle: '请选择邮件配置方式',
      defaults: '默认配置',
      ddesc: '默认配置将由系统exchange账号发送通知',
      tips: '修改成功',
      server1: 'Exchange服务器',
      server2: 'SMTP服务器'
    },
    sms: {
      title: '短信',
      desc: '短信通知员工，以及快捷回复时，短信通知访客'
    },
    yuyin: {
      title: '语音电话',
      desc: '当访客在前台Pad签到时，通过语音电话通知受访员工'
    },
    dd: {
      title: '钉钉',
      desc: '当有访客签到时，通过钉钉通知员工',
      tip: '如果要开启此项通知方式，请点击此处设置导入通讯录方式'
    },
    rtx: {
      title: 'RTX',
      desc: '当有访客签到时，通过RTX通知员工',
      tip: '如果要开启此项通知方式，请点击此处设置导入通讯录方式'
    },
    order: {
      title: '预约授权',
      desc: '开启后，访客预约拜访需要员工在“来访通”服务号中进行授权。'
    },
    invite: {
      title: '邀请函模板',
      desc: '员工在发送邀请短信时，点击打开邀请函查看具体面谈时间、地点、企业文化等信息，邀请函编辑后可成为所有员工',
      empTitle: '限制员工修改',
      empDesc: '邀请函模板限制员工修改开关，开关打开后，员工登录后将不能修改模板'
    },
    stagetime: {
      title: '前台验证有效期',
      desc: '设置前台验证访客预约信息的时间范围，如果时间未到请让访客等候，过时请让访客重新预约',
      preExtendTime: '预约时间前:',
      latExtendTime: '预约时间后:'
    },
    codetime: {
      title: '二维码有效期',
      desc: '设置邀请函中二维码开门有效时间',
      qrMaxCount: '二维码最大使用次数:',
      qrMaxDuration: '二维码最长使用时间'
    },
    codesign: {
      title: '二维码签到',
      desc: '开启后，邀请函中出现“二维码”模块，可用于前台PC扫码枪（访客列表页面右侧进入）、手机验证端进行扫描验证。'
    },
    clogo: {
      title: '企业LOGO',
      desc: '我们将在Pad首屏展示您的企业LOGO',
      tip: '提示：支持JPEG、PNG格式，推荐您使用背景透明的PNG图片'
    },
    vset: {
      title: '访客登记设置',
      desc: '您可以设置访客所需填写的信息',
      cdesc: '您可以自定义设置访客登记的内容'
    },
    vpaper: {
      title: '访客贴纸选择',
      desc: '您可以查看访客贴纸的样式、尺寸及展示内容'
    },
    safe: {
      title: '安全协议',
      desc: '点击编辑访问安全协议的内容，访客阅读并勾选“已阅读"后方能进入下一步。',
      dialog: {
        title: '安全协议设置'
      }
    },
    once: {
      title: '曾经来过',
      desc: '访客再次到访时可以只输入手机号完成签到'
    },
    sos: {
      title: '登出开关',
      desc: '开启后Pad首页出现“登出”入口，访客离开时点击输入手机号完成签离。'
    },
    team: {
      title: '团队到访',
      desc: '您可以选择开启该功能，提高团队到访时的接待效率',
      dialog: {
        title: '默认头像'
      }
    },
    pics: {
      title: '首屏轮播图片',
      desc: '选择2-5张企业形象图片，将在Pad首屏轮播展示'
    },
    themecolor: {
      title: '企业颜色',
      desc: '您可以自定义设置Pad客户端的外观颜色'
    },
    innerphoto: {
      title: '内置头像设置',
      desc: '当访客在拍照时选择“跳过”时，展示内置头像，您可设置企业形象相关的头像，如果内置头像全部删除，则访客无法跳过拍照流程。',
      dialog: {
        title: '默认头像'
      }
    },
    facein: {
      title: '刷脸签到',
      desc: '开启后，邀请函中出现“刷脸签到”模块，访客上传照片后，可在前台Pad上的“已预约——刷脸签到”中进行刷脸签到。'
    },
    doorset: {
      title: '门岗设置',
      desc: '添加门卫操作',
      dialog: {
        title: '门岗信息设置',
        add: '增加门岗'
      },
      signinDoor: '签入门岗',
      signoutDoor: '签出门岗',
      signinGuard: '签入警卫',
      signoutGuard: '签出警卫'
    },
    worktime: {
      title: '工作时间设置',
      desc: '设置工作时间，以便访客在此时间段内才能开门，并在下班后提醒仍有访客未签出。',
      dialog: {
        title: '时间段设置',
        upDuty: '上班时间填写',
        offDuty: '下班时间填写'
      }
    },
    coms: {
      title: '多企业服务模式',
      desc: '适用于众创空间、物业等办公服务主体，可为入驻企业提供Pad端形象展示和访客管理服务。',
      dialog: {
        title: '企业信息',
        title1: '企业联系人信息',
        title2: '所有公司'
      },
      deletetip: {
        title: '删除子公司',
        desc: '确定删除子公司？'
      }
    }
  },
  btn: {
    editBtn: '编辑',
    createNow: '立即创建',
    shouBtn: '收起',
    backListBtn: '返回列表',
    saveBtn: '保存',
    addBtn: '添加',
    saveAndBtn: '保存并继续添加',
    exportBtn: '导出配置',
    export: '导出',
    overview: '预览',
    searchBtn: '搜索',
    picBtn: '选择图片',
    addBlackBtn: '添加黑名单',
    dotDeleteBtn: '批量删除',
    sendFaceBtn: '下发全部人脸',
    addProjectBtn: '添加项目',
    editProjectBtn: '编辑项目',
    moveProjectBtn: '调整项目',
    addVisitorBtn: '添加访客',
    cardBtn: '生成访客卡',
    updateBtn: '修改',
    deleteBtn: '删除',
    initPwdBtn: '初始化密码',
    cancelBtn: '取消',
    haveCancel: '已取消',
    confirmBtn: '确定',
    edit1: '操作',
    addComBtn: '添加公司',
    downMobanBtn: '下载模板',
    uploadComBtn: '上传公司',
    uploadlgo: '上传logo',
    uploadExcel: '上传excel',
    addMeeting: '增加会议',
    editMeeting: '会议管理',
    saveMobanBtn: '保存模板',
    sendInvite: '发送会议邀请',
    addDepartBtn: '添加子部门',
    addEmpBtn: '添加员工',
    exportListBtn: '导入通讯录',
    editDepart:'编辑部门',
    moveDepart:'调整部门',
    synBtn: '同步',
    addRoleGroup: '新增角色组',
    addRole: '新增角色',
    editGroup:'角色组编辑',
    editRole:'角色编辑',
    addMember: '添加成员',
    batchOut: '批量签出',
    sendInvite: '发送邀请'
  },
  role: {
    rgroup: '角色组名称',
    rolename: '角色名称',
    rolegroup: '角色组'
  },
  exporttype: {
    title: '通过Excel导入',
    desc1: '表格内需要包含：姓名、邮箱、手机号码,',
    desc2: '支持csv、xls、xlsx后缀的Excel文档格式',
    desc3: '查看模板',
    desc4: '点此修改',
    desc5: '您已经选择',
    list: ['Excel导入','RTX同步','钉钉同步'],
    desc6: '您当前已选择"',
    desc7: '"方式导入通讯录',
    desc8: '作为导入通讯录的方式，',
    desc9: '每天00:00自动同步RTX',
    ip: 'IP地址',
    ipSet: 'IP设置',
    ddSet: '钉钉设置',
    CorpID: 'CorpID',
    CorpSecret: 'CorpSecret',
    agentid: '微应用 agentid',
    port: '端口',
    isNull: '不能为空',
    tip1: '钉钉已打开，无法开启RTX',
    tip2: 'RTX已打开，无法开启钉钉',
    tip3: '钉钉开关已打开，RTX开关无法开启，如若开启RTX，请先关闭钉钉',
    tip4: 'RTX设置未打开，无法开启自动同步',
    tip5: '钉钉设置未打开，无法开启自动同步',
    tip6: 'RTX开关已打开，钉钉开关无法开启，如若开启钉钉，请先关闭RTX'
  },
  emplist: {
    pro: '组织架构',
    com: '角色',
  },
  project: {
    pro: '项目列表',
    com: '公司列表',
    addprotitle: '新增项目',
    proname: '项目名称'
  },
  depart: {
    departName: '部门名称',
    prevDepartName: '上级部门',
    manager: '设置主管',
    selectDepart: '选择部门',
    hasDepart: '已选部门',
    dlist: '部门列表',
    selectPrevDepart: '选择上级部门',
    next: '下级',
    sup: '选择项目已达上限',
    tip: '主公司无法编辑',
    smember: '选择人员',
    hasMember: '已选人员',
    allEmp: '所有员工',
    noemp: '该部门暂无员工'
  },
  picTips: {
    logotip: '提示：支持JPEG、PNG格式，推荐您使用背景透明的PNG图片',
    slidetip: '提示：建议上传1536x2048像素的图片'
  },
  outTip: {
    title: '确认退出吗?',
    desc: '提示',
    conform: '确定',
    cancel:'取消'
  },
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
  deleteTip: {
    title: '删除提示',
    desc: '是否要删除?',
    success: '删除成功!',
    cancelD: '已取消删除'
  },
  validPassword: {
    tip1: '密码格式不正确',
    tip2: '密码长度不小于6位'
  },
  validEmail: {
    tip1: '邮箱格式不正确',
    success: '邮件发送成功！',
    tip2: '请输入邮箱'
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
      title: '忘记密码？',
      page: {
        title: '忘记密码',
        desc: '输入您的电子邮件地址，我们会送您如何重置密码的说明',
        btn: '发送重置链接'
      }
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
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
    scom: '请选择公司',
    ptip: '初始化密码请及时修改，以防信息泄露'
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
    24: '手机号不唯一',
    27: '无效的token',
    28: '无token',
    44: '拜访类型错误',
    46: '公司已存在',
    51: '钉钉设置失败',
    55: '发起人不在员工列表中，请重新发起会议',
    119: '验证码无效'
  },
  navlist: [{
    name: '访客',
    dirname: 'index',
    link: 'index.html',
    children: []
  },{
    name: '人员',
    dirname: 'emp',
    link: 'emp.html',
    children: [{
      name: '公司员工',
      dirname: 'emplist',
      link: 'emplist.html',
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
      dirname: 'setting',
      link: 'pad.html',
      children: []
    },{
      name: '预约邀请',
      dirname: 'setting',
      link: 'reserve.html',
      children: []
    },{
      name: '智能门禁',
      dirname: 'setting',
      link: 'key.html',
      children: []
    }]
  },{
    name: '会议',
    dirname: 'meeting',
    link: 'meeting.html',
    children: []
  }],
  empnav: [{
    name: '邀请',
    dirname: 'order',
    link: '',
    children: []
  },{
    name: '邀请列表',
    dirname: 'list',
    link: 'list',
    children: []
  }],
  homepage:{
    name: '官网首页',
    link: '#'
  },
  hlogo: {
    text: '来访通'
  },
  moban: {
    text: '发起会议',
    text1: '会议邀请记录',
    tip: '邀请发送成功',
    tip1: '您在会议邀请记录列表查看邀请列表',
    tip2: '知道了',
    tip3: '会议内容',
    tip4: '会议地址',
    tip5: '至少添加一名访客',
    tip6: '至少添加一条来访者信息',
    visitMess: '来访者信息',
    address: '公司地址',
    traffic: '停车信息及周边交通',
    compro: '公司简介',
    inviteLink: '邀请函链接',
    single:'单独邀请',
    dot: '批量邀请',
    facemoban: '面试模板',
    busmoban: '商务模板',
    ctitle: '填写来访者相关信息，即可生成短信邀请函，发送至对方手机。',
    cdesc: '预约短信内更多公司相关信息',
    tip7: '您可以选择逐条编辑，也可以通过Excel批量导入',
    mtitle: '邀请短信内更多公司相关信息',
    emptip: '限制员工编辑开关开启，模板不可编辑',
    hello: '您好！',
    hello1: '诚邀您前来',
    hello2: '详情请点击邀请函',
    interview: {
      title: '邀请函内容',
      desc: '书写规范形如:{visitor}来访者名字、{company}公司名称、{empid}预约员工id不可修改',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
    },
    business: {
      title: '邀请函内容',
      desc: '书写规范形如:{visitor}来访者名字、{company}公司名称、{empid}预约员工id不可修改',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
    }
  },
  account: {
    siderBar: {
      title: '账户信息',
      list: [{
        name: '基本资料',
        link: 'base'
      },{
        name: '账户安全',
        link: 'safe'
      },{
        name: '前台验证账号',
        link: 'stage'
      },{
        name: '多企业服务模式',
        link: 'coms'
      }]
    },
    base: {
      title: '基本资料'
    },
    safe: {
      title: '账户安全'
    },
    stage: {
      title: '验证端账号',
      tip: '支持PC、手机端验证'
    }
  },
  downlist:['账号管理','修改密码','退出账号'],
  footer: {
    ftext1: '版权所有',
    ftext2: '南京访客乐网络科技有限公司. 保留一切权利.',
    flink: '苏ICP备15058768号' 
  }
}
