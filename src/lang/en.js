export default {
  searchVnameHolder: 'Search visitor name',
  signOutWinTitle: 'sign out window',
  isLeave: 'Confirm leave?',
  visittype: 'Visit type',
  visitcause: 'The reason for the visit',
  visitData: 'Visitor data',
  recepaccount: 'Reception account',
  contactvtype: 'Select linked visit type',
  contactvtype1: 'link the visit type',
  semp: 'Select employee',
  scopy: 'Select copy',
  nextStep: 'The next step',
  prevStep: 'Previous',
  emptip: 'Please select an employee as the default cc person (can not choose)',
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
      dirname: 'emp',
      link: 'emplist.html',
      children: []
    }, {
      name: 'Resident Visitors',
      dirname: 'emp',
      link: 'visitlist.html',
      children: []
    }, {
      name: 'Blacklist',
      dirname: 'emp',
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
    text: 'Launch a conference',
    text1: 'invitation record of the meeting',
    tip: 'send invitation successfully',
    tip1: 'You look at the invitation list at the conference invitation record list',
    tip2: 'Got it',
    tip3: 'Conference content',
    tip4: 'Conference address',
    tip5: 'Add at least one visitor',
    tip6: 'Add at least one visitor information',
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
    hello: 'Hello!',
    hello1: 'Sincerely invite you to come',
    hello2: 'Please click the invitation for details',
    interview: {
      title: 'The content of the invitation',
      desc: 'Writing specifications such as: {visitor}visitor name, {company}company name,{empid}reserved employee ID cannot be modified',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
    },
    business: {
      title: 'The content of the invitation',
      desc: '书写规范形如:{visitor}来访者名字、{company}公司名称、{empid}预约员工id不可修改',
      defaultMoban: '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
    }
  },
  tablehead: ['order number', 'Conference name', 'time', 'Initiator', 'theme', 'QR code', 'phone', 'Cause', 'Launch time', 'company', 'status', 'Sending State'],
  formCheck: {
    validPassword: {
      tip1: 'Incorrect password format',
      tip2: 'The password length is not less than 6 bits',
      tip3: 'The password can not be empty',
      tip4: 'Please input a password',
      tip5: 'Two input password inconsistencies',
      tip6: 'Please enter the password again'
    },
    validEmail: {
      tip1: 'Incorrect mailbox format',
      success: 'Email is successful!',
      holder: 'email',
      tip2: 'Mailbox cannot be empty'
    },
    validphone: {
      tip1: 'The format of the phone number is not correct',
      tip2: 'Cell phone number can not be empty',
      holder: 'Phone number'
    },
    validCompany: {
      tip1: 'The name of the company can not be empty',
      tip2: 'The Department can’t be empty'
    },
    validCompanyPro: {
      tip1: 'The company can not be short for short',
      tip2: 'The longest 6 characters'
    },
    validName: {
      tip1: 'The name cannot be empty',
      tip2: 'Contain illegal characters',
      tip3: 'The name cannot be empty',
      tip4: 'Please choose the sponsor of the conference',
      tip5: 'Employee name can not be empty'
    },
    validEmpName: {
      holder: 'Employee name'
    },
    validAccont: {
      tip1: 'Please enter the account number'
    },
    time: {
      tip1: 'Please check the time',
      tip2: 'The date can not be empty',
      minute: 'minute',
      day: 'day',
      times: 'second'
    },
    meeting: {
      tip1: 'Please fill in the theme'
    },
    remark: {
      tip1: 'Please fill in the notes'
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
  dataM: 'Data management',
  vstatus: ['sent', 'signed in', 'viewed', 'Accepted', 'refused', 'signed out', 'Unauthorized', 'Authorized', 'reserved', 'Expired'],
  vtype: ['Sign-in visitors', 'Reserved visitors', 'Invited visitors', 'Resident visitors'],
  vnum: ['Total number of visitors', 'Number of visitors that have left', 'Number of people visiting', 'Total', 'Number of sign-in', 'Number of people absent', 'Visitor'],
  vdate: ['Start date', 'End date', 'Selection date'],
  vtime: ['start time', 'End time'],
  visitor: {
    vname: 'the name of the visitor',
    vphone: 'Visitor’s cell phone number',
    vcom: 'Visitor company',
    ename: 'Name of the visitor',
    ephone: 'Phone of the visitor',
    ecom: 'Phone number of the interviewee',
    ordertime: 'the reservation time',
    visittime: 'Time of visit',
    leavetime: 'Time of departure',
    followPeople: 'follow-up personnel',
    list: 'Visitor details',
    manager: 'Director',
    editEmp: 'Editors'
  },
  role: {
    tip: 'Please select the role group',
    tip1: 'Selection of role groups',
    tip2: 'Please choose the role'
  },
  export: {
    title: 'Visitor list export item settings'
  },
  signStatus: ['Signed in', 'Signed out', 'Reserved', 'Expired', 'Sent', 'Viewed', 'Accepted', 'Refused', 'Authorized', 'Unauthorized'],
  record: 'Found',
  record1: 'in total，about',
  record2: 'Record',
  version: [{
    type: 0,
    name: 'free'
  }, {
    type: [1, 2],
    name: 'Business'
  }, {
    type: 3,
    name: 'Factory'
  }],
  endTimeText: 'expired',
  guide: {
    guide1: {
      title: 'Welcome to join us',
      desc: 'You only need to complete the following operations to customize the Cool Visit. For help, please click on the “Consultation” on the right side of the page.',
      inputTitle: 'Please fill in the information about the company',
      inputPlaceholder: 'Company name remarks (up to six words)',
      inputDesc: 'Prompt: The remark of the company name is used for WeChat and visitor stickers',
      next: 'Next: Notification settings',
      btn: 'Next'
    },
    guide2: {
      title: 'Add employee information',
      desc: 'After adding the employees, you can experience our most powerful function: to automatically notify the employees of the visitors. Please add at least one piece of employee information. Support RTX and the Excel import of the employee address book. It’s more recommended that you can try to add by hand, and directly enter the employee information into the backstage.',
      inputTitle: 'Please fill in the information about the company',
      inputPlaceholder: 'Company name remarks (up to six words)',
      inputDesc: 'Prompt: The remark of the company name is used for WeChat and visitor stickers',
      next: 'Next: Notification settings',
      btn: 'Next'
    },
    guide3: {
      title: 'Registration content setting',
      desc: 'Your visitors will register on the iPad page. We will provide you with the following registration contents, and you can personalize it.',
      inputTitle: 'Please fill in the information about the company',
      inputPlaceholder: 'Company name remarks (up to six words)',
      inputDesc: 'Prompt: The remark of the company name is used for WeChat and visitor stickers',
      next: 'Next: Notification settings',
      btn: 'Next'
    },
    guide4: {
      title: 'Notification mode setting',
      desc: 'We will provide you with five modes of notification, WeChat, email, DingTalk, RTX and SMS. Please click on the switch on the right to set up the way the employee receives the notification.',
      inputTitle: 'Please fill in the information about the company',
      inputPlaceholder: 'Company name remarks (up to six words)',
      inputDesc: 'Prompt: The remark of the company name is used for WeChat and visitor stickers',
      next: 'Next: Welcome the visitors',
      btn: 'Next'
    },
    guide5: {
      title: 'Pad terminal settings',
      desc: 'Your visitors will register on the iPad page. We will provide you with the following registration contents, and you can personalize it.',
      inputTitle: 'Please fill in the information about the company',
      inputPlaceholder: 'Company name remarks (up to six words)',
      inputDesc: 'Prompt: The remark of the company name is used for WeChat and visitor stickers',
      next: 'Next: Welcome the visitors',
      btn: 'enter background management'
    }
  },


  phoneIdnum: {
    text: '*ID card and mobile number choose one',
    tips: 'Make at least one phone number and ID number'
  },
  sex: ['male', 'Female'],
  idNumTip: ['Verification passed!', 'the number of your ID number is incorrect!', "Identity number birth date is out of range or contains illegal characters!", "ID number verification error!", "ID Area illegal!"],
  people: {
    emp: 'Employee',
    visit: 'Visitor',
    inviteVisit: 'Invite visitors',
    orderVisit: 'Check-in visitor',
    and: 'And'
  },
  status: {
    on: 'Enable',
    off: 'Disabled',
    text: 'Status',
    startText: 'Open state'
  },
  key: {
    htitle: 'Equipment Management',
    title: 'Device Information',
    ctitle: 'Equipment team member',
    ctitle1: 'Device List',
    title1: 'Open log',
    ctitle2: 'Device open record',
    addGroup: 'Add device group',
    updateGroup: 'Modify device group',
    groupName: 'Group name',
    groupId: 'Group number',
    groupRule: 'Service regulations',
    groupAuth: 'Access authority',
    groupStatus: 'Default opening after authorization',
    addEquip: 'Add Equipment',
    equipeName: 'Equipment name',
    equipMark: 'Equipment identification',
    extendMark: 'Extension identification',
    doorNumber: 'Door number',
    equipIp: 'Equipment IP',
    equipPort: 'Equipment port number',
    headNumber: 'Read head number',
    equipDist: 'Distribution of equipment group'
  },
  black: {
    wins: {
      title: 'New blacklist'
    }
  },
  pad: {
    usualSet: 'General settings',
    padSet: 'Pad settings',
    scolor: 'choose the color',
    inputColor: 'Input color value'
  },
  notice: {
    tip: {
      title: 'Reminder notification',
      desc: 'Please click on the switch on the right to set up the way the employee receives the notification.'
    },
    black: {
      title: 'Blacklist switch',
      desc: 'After the blacklist function is turned on, people in the blacklist will not be able to make an reservation or to register.',
    },
    weixin: {
      title: 'WeChat',
      desc: 'When a visitor signs in, notify the employee through the WeChat service account “Cool Visit”. The employee should register with the phone number in the address book on the service account ahead of time.',
    },
    email: {
      title: 'Email',
      desc: 'Notify employees by email when a visitor signs in',
      ptitle: 'Please select the mail configuration method',
      defaults: 'Default configuration',
      ddesc: 'In the default configuration, notifications will be sent from the exchange account of the system.',
      tips: 'Successfully modified',
      server1: 'Exchange server',
      server2: 'SMTP server'
    },
    sms: {
      title: 'SMS',
      desc: 'Notify employees by SMS, and notify visitors by SMS when quick reply.'
    },
    yuyin: {
      title: 'Voice call',
      desc: 'When a visitor signs in on the Pad of the Reception notify the interviewed employee through a voice call.'
    },
    dd: {
      title: 'DingTalk',
      desc: 'Notify the employee by DingTalk when a visitor signs in.',
      tip: 'If you want to turn on this notification method, click here to set the way to import contacts'
    },
    rtx: {
      title: 'RTX',
      desc: 'Notify employees through RTX when a visitor signs in',
      tip: 'If you want to turn on this notification method, click here to set the way to import contacts'
    },
    order: {
      title: 'Reservation authorization',
      desc: 'After opening, the visitors need to be authorized to make a reservation in the service account of “Cool Visit”.'
    },
    invite: {
      title: 'Invitation template',
      desc: 'When the invitation message is sent, the employee clicks on the invitation to see the interview time, place, enterprise culture and so on. After the invitation is edited, the invitation will be available for all the employees.',
      empTitle: 'Restrict employee modification',
      empDesc: 'The invitation template restricts the switch for employee to modify. After the switch is turned on, the employee will not be able to modify the template after login.'
    },
    stagetime: {
      title: 'Term of validity of the Reception verification',
      desc: 'Please set up the time range of the Reception to verify the visitor’s reservation information. If the time is not available, please let the visitor wait. Please ask visitors to make a reservation again if they are over time.',
      preExtendTime: 'before the reservation time:',
      latExtendTime: 'after the reservation time:'
    },
    codetime: {
      title: 'Validity period of QR Code',
      desc: 'Please set up the valid time of the QR Code in the invitation.',
      qrMaxCount: 'Maximum time of use for the QR Code:',
      qrMaxDuration: 'Maximum time of use for the QR Code'
    },
    codesign: {
      title: 'Sign in by the QR Code',
      desc: 'After opening, the “QR Code” module will appear in the invitation, which can be used for the scanning verification for the PC barcode scanner at the Reception (on the right side of the list of visitors) and the mobile verification terminal.'
    },
    clogo: {
      title: 'Enterprise LOGO',
      desc: 'We will show your enterprise LOGO on the first screen of the Pad.',
      tip: 'Prompt: Support the JPEG and PNG. It is recommended to choose a PNG picture with transparent background.'
    },
    vset: {
      title: 'Visitor registration setting',
      desc: 'You can set information for visitors',
      cdesc: 'You can customize the content of guest registration',
      vdesc: 'This information is optional and can be set to visible',
      vselfdesc: 'This is your custom add, required input',
      vselfdesc1: 'This is your custom addition, optional input'
    },
    vpaper: {
      title: 'Selection of visitor sticker',
      desc: 'You can view the style, size and content displayed of the visitor stickers.',
      printType: 'Printer model',
      printBlackType: 'Black and white printing of visitor stickers (suitable for Brother QL-720NW printer)',
      printColorType: 'Color printing of visitor stickers',
      comShow: 'Selection of corporate image display',
      comTextShow: 'Text display (within 6 characters)',
      comPicShow: 'Picture display (recommended size 168x42px)',
      vType: 'Printing style of the visitor sticker',
      cardText: 'Applicable for sticking to the body',
      cardSize: 'Size',
      cardStyle: 'Style',
      cardText1: 'Suitable for 90*60mm card sleeves',
      cardText2: '5-inch standard printing paper',
      cardText3: '4-inch WeChat printing paper',
      codeWinTitle: 'QR Code avatar',
      insertLink: 'Insert a link',
      uploadPic: 'upload picture'
    },
    safe: {
      title: 'Security protocol',
      desc: 'Please click on “Edit” to access the contents of the security protocol, and visitors should read and check "Read" before entering the next step.',
      dialog: {
        title: 'Security protocol settings'
      }
    },
    once: {
      title: 'Once visited',
      desc: 'Visitors only need to enter the phone number to sign in when they visit again.'
    },
    sos: {
      title: 'Logout switch',
      desc: 'After turning on, the entry to “Logout” appears on the Pad homepage. Enter the phone number to complete the sign-out when the visitors leave.'
    },
    team: {
      title: 'Team visit',
      desc: 'You can choose to turn on the function to improve the reception efficiency of the team when they visit.',
      dialog: {
        title: 'Default avatar'
      }
    },
    pics: {
      title: 'Carousel pictures on the first screen',
      desc: 'Select two to five pictures representing corporate image, which will be displayed by carousel on the first screen.'
    },
    themecolor: {
      title: 'Enterprise color',
      desc: 'You can customize the appearance color of the Pad client.'
    },
    innerphoto: {
      title: 'Built-in avatar settings',
      desc: 'Display the built-in avatars when visitors select "Skip" when taking photos. You can set up an avatar related to the corporate image. If all the built-in avatars are deleted, visitors can not skip the photo-taking process.',
      dialog: {
        title: 'Default avatar'
      }
    },
    facein: {
      title: 'Sign in by face swiping',
      desc: 'After turning on, there will be a module of “Face swiping to sign in” in the invitation. After uploading the photos, visitors can sign in “Reserved—Sign-in by face swiping” on the Pad of the Reception.'
    },
    doorset: {
      title: 'Security settings',
      desc: 'Add guard operations',
      dialog: {
        title: 'Security information settings',
        add: 'Increase the gate'
      },
      signinDoor: 'Sign in the gate',
      signoutDoor: 'Sign out the gate',
      signinGuard: 'Sign in by guard',
      signoutGuard: 'Sign out by guard'
    },
    worktime: {
      title: 'Working time settings',
      desc: 'Please set up working hours so that visitors can open the door during this time period. Remind that there are visitors who haven’t signed out after work.',
      dialog: {
        title: 'Time settings',
        upDuty: 'Please fill in the starting time.',
        offDuty: 'Please fill in the closing time.'
      }
    },
    coms: {
      title: 'Multi-enterprise service model',
      desc: 'It can be applied to maker space, property and other subjects for office services, providing image display and visitor management services at the Pad terminal for settled enterprises.',
      dialog: {
        title: 'Corporate Information',
        title1: 'Corporate contact information',
        title2: 'All companies'
      },
      deletetip: {
        title: 'Delete subsidiary',
        desc: 'Are you sure to delete a subsidiary?'
      }
    }
  },
  approve: {
    title: 'Please set up the approval process.',
    desc: 'Please set up the approver according to the visit area. The reservation must be approved by the approver before the adoption.',
    atitle: 'Switch of the approval process',
    adesc: 'After the approval function is turned on, the application for access must be approved at multiple levels according to the conditions of approval.',
    astitle: 'Please set up the approval conditions.',
    addArea: 'Add a new area',
    areaName: 'Area name',
    areaAddress: 'Address of the area',
    contact: 'Associate Approver'
  },

  role: {
    rgroup: 'Role group name',
    rolename: 'role name',
    rolegroup: 'the role groups'
  },
  exporttype: {
    title: 'Import through Excel',
    desc1: 'The table needs to include: name, email address, phone number.',
    desc2: 'Excel file format support for csv, xls, xlsx suffixes',
    desc3: 'View the template',
    desc4: 'Click here to modify',
    desc5: 'You have chosen',
    list: ['Import Excel', 'RTX synchronization', 'DingTalk synchronization'],
    desc6: 'You have chosen"',
    desc7: '"as a way of importing the address book.',
    desc8: 'as a way of importing the address book.',
    desc9: 'Synchronize RTX automatically every day at 00:00',
    ip: 'IP address',
    ipSet: 'The setting of IP',
    ddSet: 'The setting of DingTalk',
    CorpID: 'CorpID',
    CorpSecret: 'CorpSecret',
    agentid: 'the micro application agentid',
    port: 'Port',
    isNull: 'can not be empty.',
    tip1: 'DingTalk has been turned on and the RTX failed to be turned on.',
    tip2: 'RTX has been turned on and the DingTalk failed to be turned on',
    tip3: 'The DingTalk switch has been turned on and the RTX switch cannot be turned on. If you turn on the RTX, please turn off DingTalk first.',
    tip4: 'The RTX setting is not turned on and the automatic synchronization cannot be turned on.',
    tip5: 'The setting of DingTalk is not turned on, and the automatic synchronization cannot be turned on.',
    tip6: 'The RTX switch has been turned on and the DingTalk switch cannot be turned on. If you turn on the DingTalk, please turn off RTX first.'
  },
  emplist: {
    pro: 'Organizational Structure',
    com: 'Role',
    pad: 'Whether it is not searchable at the Pad terminal',
    cardTip: 'This function is only used for batch issuance of the cards, and the original data will be deleted in the process. The card issuance will last for several minutes.'
  },
  project: {
    pro: 'Project List',
    com: 'Lists of Companies',
    addprotitle: 'New Project',
    proname: 'Project name'
  },
  depart: {
    departName: 'Department name',
    prevDepartName: 'Superior department',
    manager: 'Set up the director',
    selectDepart: 'Select the department',
    hasDepart: 'Selected department',
    dlist: 'Department list',
    selectPrevDepart: 'Select superior department',
    next: 'Subordinate',
    sup: 'The selected item has reached the upper limit',
    tip: 'The main company cannot edit',
    smember: 'Select people',
    hasMember: 'Selected people',
    allEmp: 'All employees',
    noemp: 'The department has no employees'
  },
  picTips: {
    logotip: 'Tip: support JPEG, PNG format, it is recommended that you use a background transparent PNG image',
    slidetip: 'Tip: It is recommended to upload a 1536x2048 pixel image'
  },
  deleteTip: {
    title: 'Delete prompt',
    desc: 'Do you want to delete?',
    success: 'successfully deleted!',
    cancelD: 'Undeleted'
  },
  validPassword: {
    tip1: 'Incorrect password format',
    tip2: 'Password length is not less than 6'
  },
  validEmail: {
    tip1: 'E-mail format is incorrect',
    success: 'Mail sent successfully!',
    tip2: 'please input your email'
  },
  imgcode: {
    tip1: 'verification code must be filled'
  },
  validphone: {
    tip1: 'Phone number format is incorrect',
    tip2: 'Phone number can not be empty'
  },
  validStage: {
    tip1: 'Account cannot be empty'
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
    name: 'Website homepage',
    link: '#'
  },
  hlogo: {
    text: '来访通'
  },
  account: {
    siderBar: {
      title: 'Account information',
      list: [{
        name: 'Basic information',
        link: 'base'
      }, {
        name: 'Account security',
        link: 'safe'
      }, {
        name: 'Verify the account by the Reception',
        link: 'stage'
      }, {
        name: 'Multi-enterprise service model',
        link: 'coms'
      }]
    },
    base: {
      title: 'Basic Information'
    },
    safe: {
      title: 'Account Security'
    },
    stage: {
      title: 'Account at the verification terminal',
      tip: 'Support the verification at the PC terminal and mobile terminal'
    }
  },
  footer: {
    ftext1: 'All Rights Reserved',
    ftext2: 'Nanjing Fangkele Network Technology Co., Ltd. reserves its rights.',
    flink: 'ICP License No. 15058768 by Jiangsu Communications Administration'
  }
}
