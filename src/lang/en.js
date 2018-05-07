export default {
  loginselect: ['Administrator', 'Headquarters Administrator', 'Settled Enterprise', 'Employee', 'Reception'],
  login: {
    title: 'Administrator',
    logIn: 'Login',
    username: 'account',
    password: 'password',
    forgot: {
      title: 'Forget Password?',
      page: {
        title: 'Forget Password',
        desc: 'Please enter your email address and we will send you instructions on how to reset your password.',
        desc1: 'Please enter the phone number, get the verification code',
        desc3: 'Reset your password',
        desc2: 'Reset password successfully!',
        desc4: 'Activate the account successfully!',
        btn: 'Send a reset link'
      }
    },
    or: 'or',
    signup: 'Enterprise Registration',
    active: 'Activate the account'
  },
  validName: {
    tip: 'The format of the super account is incorrect, beginning with LFT_'
  },
  signup: {
    title: 'registration',
    desc: 'Immediately experience a more intelligent visitor management system',
    button: 'registration'
  },
  navlist: [{
    name: 'Visitor',
    dirname: 'index',
    link: 'index.html',
    children: []
  }, {
    name: 'Emplist',
    dirname: 'emp',
    link: 'emp.html',
    children: [{
      name: 'Company Employee',
      dirname: 'emplist',
      link: 'emplist.html',
      children: []
    }, {
      name: 'Resident Visitors',
      dirname: 'visitlist',
      link: 'visitlist.html',
      children: []
    }, {
      name: 'Blacklist',
      dirname: 'blacklist',
      link: 'blacklist.html',
      children: []
    }]
  }, {
    name: 'Notification',
    dirname: 'notice',
    link: 'notice.html',
    children: []
  }, {
    name: 'Custom Settings',
    dirname: 'setting',
    link: 'setting.html',
    children: [{
      name: 'Reception Settings',
      dirname: 'setting',
      link: 'pad.html',
      children: []
    }, {
      name: 'Reservation & Invitation',
      dirname: 'setting',
      link: 'reserve.html',
      children: []
    }, {
      name: 'Intelligent Door Access',
      dirname: 'setting',
      link: 'key.html',
      children: []
    }]
  }, {
    name: 'Conference ',
    dirname: 'meeting',
    link: 'meeting.html',
    children: []
  }],
  empnav: [{
    name: 'Invitation',
    dirname: 'order',
    link: '',
    children: []
  }, {
    name: 'Invitation List',
    dirname: 'list',
    link: 'list',
    children: []
  }],
  downlist: ['Account Management', 'Update Pasword', 'Exit'],
  form: {
    name: {
      text: 'name',
      text1: 'visitor',
      text2: 'interviewee',
      text3: 'nickname',
      text4: 'operator',
      text5: 'type of operator'
    },
    depart: {
      text: 'department'
    },
    phone: {
      text: 'phone',
      text1: 'information of contact',
      text2: 'interviewee’s contact information',
      text3: 'telephone',
      text4: 'phone number'
    },
    idnum: {
      text: 'id card number',
      text1: 'Certificate No.',
      text2: 'scanning copy of the certificate'
    },
    email: {
      text: 'email',
      checktext: 'email subscription',
      tiptitle: 'Are you sure you will not receive the mail?',
      tipdesc: 'Check this item to <strong>indicate</strong> that no mail will be accepted after visiting.'
    },
    company: {
      text: 'company name',
      text2: 'company',
      text1: 'office',
      text3: 'Affiliated company'
    },
    companypro: {
      text: 'abbreviation of the company',
      text2: 'work unit'
    },
    position: {
      text: 'position',
      text1: 'work number'
    },
    password: {
      oldtext: 'old password',
      newtext: 'new password',
      retext: 'confirm the new password',
      text1: 'password',
      comtext: 'This is the initialized password, so please modify it in time to prevent information leakage.'
    },
    stageaccount: {
      text: 'account at the verification terminal'
    },
    count: {
      text: 'Number of visitors',
      text1: 'List of follow-up personnel'
    },
    remark: {
      text: 'remark'
    },
    time: {
      text6: 'time',
      text: 'Sign-in time',
      text1: 'Sign-out time',
      text2: 'Time of reservation',
      text3: 'Time of invitation',
      text4: 'term of service',
      text5: 'operation time',
      text7: 'term of validity'
    },
    gate: {
      text: 'associate the gate group',
      tip: 'Please choose the gate',
      text1: 'gate information',
      text2: 'Please choose the associated gate unit'
    },
    photo: {
      tip: 'Please upload a head portrait'
    },
    visitType: {
      text: 'the type of the visit'
    }
  },
  btn: {
    editBtn: 'edit',
    createNow: 'Immediate creation',
    shouBtn: 'Take up',
    visible: 'visible',
    backListBtn: 'Return list',
    saveBtn: 'save',
    addBtn: 'Add',
    addSelectBtn: 'Add options',
    saveAndBtn: 'Save and continue to add',
    exportBtn: 'Export configuration',
    export: 'Export',
    overview: 'preview',
    searchBtn: 'search',
    picBtn: 'Select a picture',
    addBlackBtn: 'Add a blacklist',
    dotDeleteBtn: 'Batch deleting',
    dotUpdateBtn: 'Batch modification',
    editSpecial: 'Edit special account',
    dotSendCard: 'Batch card',
    sendFaceBtn: 'send the whole face',
    addProjectBtn: 'add item',
    editProjectBtn: 'Editing project',
    moveProjectBtn: 'Adjust the project',
    addVisitorBtn: 'Add visitors',
    cardBtn: 'Generating a visitor card',
    updateBtn: 'modify',
    deleteBtn: 'delete',
    insetBtn: 'Required',
    initPwdBtn: 'Initialization cipher',
    cancelBtn: 'cancel',
    haveCancel: 'cancelled',
    confirmBtn: 'confirm',
    edit1: 'operation',
    addComBtn: 'Add a company',
    downMobanBtn: 'Download template',
    uploadComBtn: 'Uploading company',
    uploadlgo: 'Upload logo',
    uploadExcel: 'Upload excel',
    addMeeting: 'Increase the meeting',
    editMeeting: 'management of meetings',
    saveMobanBtn: 'Save template',
    sendInvite: 'Send a meeting invitation',
    addDepartBtn: 'Add subdivision',
    addEmpBtn: 'Add staff',
    editEmpBtn: 'Employee editors',
    exportListBtn: 'Importing the address book',
    editDepart: 'Editorial department',
    moveDepart: 'Adjustment department',
    synBtn: 'synchronization',
    addRoleGroup: 'New role group',
    addRole: 'New role',
    editGroup: 'Role group editor',
    editRole: 'Role editing',
    addMember: 'Add members',
    batchOut: 'Batch sign out',
    sendInvite: 'Send invitations',
    clickUpload: 'click and upload',
    uploadWait: 'Please wait……'
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
    visitMess: 'visitor’s information',
    address: 'Company address',
    traffic: 'Parking information and surrounding traffic',
    compro: 'Company profile',
    inviteLink: 'Invitation link',
    single: 'Individual invitation',
    dot: 'Batch invitation',
    facemoban: 'Interview template',
    busmoban: 'Business template',
    ctitle: 'Please fill in the relevant information of visitors, and then the SMS invitation can be generated and sent to the phone number of the other side.',
    cdesc: 'More related information about the company in the SMS invitation',
    tip7: 'You can choose one by one editing or batch import through Excel.',
    mtitle: 'Invite more company related information in SMS',
    emptip: 'Restrict staff edit switch to open, template can not be edited.',
    hello: '您好！',
    hello1: '诚邀您前来',
    hello2: '详情请点击邀请函',
    interview: {
      title: 'The content of the invitation',
      desc: 'Writing specifications such as: {visitor}visitor name, {company}company name,{empid}reserved employee ID cannot be modified',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
    },
    business: {
      title: '邀请函内容',
      desc: '书写规范形如:{visitor}来访者名字、{company}公司名称、{empid}预约员工id不可修改',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
    }
  },
  tablehead: ['order number', 'Conference name', 'time', 'Initiator', 'theme', 'QR code', 'phone', 'Cause', 'Launch time', 'company', 'status', 'Sending State'],
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
      holder: '邮箱',
      tip2: '邮箱不能为空'
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
      tip1: 'Please check the time',
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
  timetype: [{
    label: 'Number of days',
    value: 0
  }, {
    label: 'frequency',
    value: 1
  }],
  itype: [{
    label: 'Interview',
    value: 0
  }, {
    label: 'Business affairs',
    value: 1
  }],
  checkVtype: ['all', 'visitor’s name', 'Interviewee’s name', 'the cause of Visit', 'telephone', 'company', 'Security'],
  outTip: {
    title: 'Do you confirm the withdrawal?',
    desc: 'tip',
    conform: 'confirm',
    cancel: 'cancel'
  },
  meeting: {},
  nodata: 'no data',
  dataM: '数据管理',
  vstatus: ['已发送', '已签到', '已查看', '已接受', '已拒绝', '已签出', '未授权', '已授权', '已预约', '已过期'],
  vtype: ['签到访客', '预约访客', '邀请访客', '常驻访客'],
  vnum: ['访客总数', '离开人数', '正在拜访人数', '总数', '签到人数', '未到人数', '访客'],
  vdate: ['开始日期', '结束日期', '选择日期'],
  vtime: ['开始时间', '结束时间'],
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
  

  signStatus: ['已签到', '已签出', '已预约', '已过期', '已发送', '已查看', '已接受', '已拒绝', '已授权', '未授权'],
  
  record: '共找到',
  record1: '条，关于',
  record2: '记录',
  version: [{
    type: 0,
    name: '免费版'
  }, {
    type: [1, 2],
    name: '商务版'
  }, {
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


  phoneIdnum: {
    text: '*身份证与手机号二选一',
    tips: '手机号与身份证号至少填一项'
  },
  sex: ['男', '女'],
  idNumTip: ['验证通过!', '身份证号码位数不对!', "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"],

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
      title: '新增黑名单'
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
      cdesc: '您可以自定义设置访客登记的内容',
      vdesc: '此信息为可选项，可设置为可见',
      vselfdesc: '这是您自定义添加，必填输入项',
      vselfdesc1: '这是您自定义添加，选填输入项'
    },
    vpaper: {
      title: '访客贴纸选择',
      desc: '您可以查看访客贴纸的样式、尺寸及展示内容',
      printType: '打印机型号',
      printBlackType: '黑白打印访客贴纸（适配Brother QL-720NW打印机）',
      printColorType: '彩色打印访客贴纸',
      comShow: '公司形象展示选择',
      comTextShow: '文字展示（6个字以内）',
      comPicShow: '图片展示（建议尺寸168x42px）',
      vType: '访客贴纸打印样式',
      cardText: '适用于贴在身上',
      cardSize: '尺寸',
      cardStyle: '样式',
      cardText1: '适用于90*60mm卡套',
      cardText2: '5寸标准相纸',
      cardText3: '4寸微信相纸',
      codeWinTitle: '二维码头像',
      insertLink: '插入链接',
      uploadPic: 'upload picture'
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
  approve: {
    title: '设置审批流程',
    desc: '根据拜访区域设置审批人，预约需经过审批人审批后方可通过。',
    atitle: '审批流程开关',
    adesc: '审批功能打开后，访问申请需要根据审批条件进行多级审批',
    astitle: '设置审批条件',
    addArea: '新增新区域',
    areaName: '区域名称',
    areaAddress: '区域地址',
    contact: '关联审批人'
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
    list: ['Excel导入', 'RTX同步', '钉钉同步'],
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
    pad: '是否在Pad端不可搜索',
    cardTip: '此功能仅用于批量发卡，过程中将删除原有数据，发卡将持续数分钟！'
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
  imgCode: 'Change code?',


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

  homepage: {
    name: '官网首页',
    link: '#'
  },
  hlogo: {
    text: '来访通'
  },

  account: {
    siderBar: {
      title: '账户信息',
      list: [{
        name: '基本资料',
        link: 'base'
      }, {
        name: '账户安全',
        link: 'safe'
      }, {
        name: '前台验证账号',
        link: 'stage'
      }, {
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

  footer: {
    ftext1: '版权所有',
    ftext2: '南京访客乐网络科技有限公司. 保留一切权利.',
    flink: '苏ICP备15058768号'
  }
}
