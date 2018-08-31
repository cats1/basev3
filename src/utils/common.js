import { getCache } from './auth'
import { getLanguage } from '@/utils/i18n'
import i18n from '@/lang'
const statusMessages = i18n.messages[i18n.locale].status
let Base64 = require('js-base64').Base64
const LocationHost = window.location.host
const LocationProtocol = window.location.protocol
const IpReg = LocationHost.indexOf('localhost') > -1 || LocationHost.indexOf('172.16.109.63') > -1
let baseURL = process.env.BASE_API
let baseLink = process.env.BASE_LINK
let stageUrl = ''
export function getBaseUrl() {
  if (IpReg) {
    baseURL = process.env.BASE_API
  } else {
    if (process.env.BASE_ISTRUE) {
      baseURL = LocationProtocol + '//' + LocationHost + '/qcvisitBase'
    } else {
      baseURL = LocationProtocol + '//' + LocationHost + '/qcvisit'
    }
  }
  return baseURL
}
export function getBaseLink() {
  if (IpReg) {
    baseLink = process.env.BASE_LINK
  } else {
    let url = window.location.href
    let hurl = url.split('.html')[0]
    let durl = hurl.substring(0, hurl.lastIndexOf("/"))
    baseLink = durl
  }
  return baseLink
}
export function getBaseCardLink() {
  if (IpReg) {
    baseLink = process.env.BASE_LINK
  } else {
    let url = window.location.href    
    if (url.indexOf('/#/') > -1) {
      let hurl = url.split('.html')[0]
      let durl = hurl.substring(0, hurl.lastIndexOf("/"))
      baseLink = durl.split('/#')[0]
    } else {
      let hurl = url.split('.html')[0]
      let durl = hurl.substring(0, hurl.lastIndexOf("/"))
      baseLink = durl
    }
  }
  return baseLink
}
export function getBaseStageLink() {
  if (IpReg) {
    stageUrl = 'http://' + process.env.HOST + '/stage/index.html?idcard=0&photo=0'
  } else {
    stageUrl = LocationProtocol + '//' + LocationHost + '/stage/index.html?idcard=0&photo=0'
  }
  return stageUrl
}
export function getBasePhpLink() {
  if (IpReg) {
    stageUrl = 'http://' + process.env.HOST + '/wechat/shjh/Youtu/detectfaceByUrl.php'
  } else {
    stageUrl = LocationProtocol + '//' + LocationHost + '/wechat/shjh/Youtu/detectfaceByUrl.php'
  }
  return stageUrl
}
/* 密码加密*/
export function lftPwdRule(str, num1, num2) {
  const strArray = str.split('')
  strArray.splice(num1, 0, randomString(5))
  const str1 = strArray.join('').split('').reverse()
  const newStr = codeEnBase(str1.join(''))
  const newStrArray = newStr.split('')
  newStrArray.splice(num2, 0, randomString(5))
  return newStrArray.join('')
}
/* 密码解密*/
export function lftDePwdRule(str) {
  const newPwd = str.split('')
  newPwd.splice(5, 5)
  const pwd = codeDeBase(newPwd.join('')).split('').reverse()
  pwd.splice(3, 5)
  return pwd.join('')
}
/* 获取随机5位数*/
export function randomString(len) {
  len = len || 32　
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
  const maxPos = $chars.length　　
  var pwd = ''　　
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }　　
  return pwd;
}
export function downloadPDF(item) {
  var links = getBaseLink() + '/pdf/' + judgeDate(item.visitdate, 1) + '_' + item.vid + '.pdf'
  window.open(links)
}
//加密
export function codeEnBase(str) {
  const enstr = Base64.encode(str)
  return enstr
}
//解密
export function codeDeBase(str) { //解密
  const destr = Base64.decode(str)
  return destr
}

function judgeDate(times, type) {
  if (times) {
    var now = new Date(times);
    var year = now.getFullYear();
    var month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    if (type == 0) {
      return year + "/" + month + "/" + date + " " + hour + ":" + minutes + ":" + seconds
    } else if (type == 1) {
      return year + "-" + month + "-" + date
    }

  } else {
    return ''
  }
}
//
export function booleanToNumber(boo) {
  return boo === true ? 1 : 0
}
//
export function numberToBoolean(num) {
  return parseInt(num) === 1 ? true : false
}
export function valueToString(value) {
  if (value === null) {
    return ''
  } else {
    return value.toString()
  }
}
export function replaceQuotation(value) {
  if (value) {
    return value.replace(/\"/g, '\\\"')
  } else {
    return ''
  }
}
export function checkIsNull(str) {
  if (str == null || str == 'null' || str == undefined || str == "") {
    return ""
  } else {
    return str
  }
}
export function replaceRemoveQuotation(value) {
  if (value) {
    return value.replace(/\\\"/g, '"')
  } else {
    return ''
  }
}
export function replaceRemoveReserveQuotation(value) {
  if (value) {
    return value.toString().replace(/\\/g, '')
  } else {
    return ''
  }
}

function splitArray1(string) {
  var vkeywords = /\,|\=/;
  if (string) {
    return string.split(vkeywords)
  } else {
    return []
  }
}

function judgeModel(array) {
  var modalText = 0; //0未添加自定义拜访模式1添加自定义拜访模式2团队拜访
  var index = 0;
  var modalArray = [];
  if (array.length > 0 && array.length <= 8) {
    for (var i = 0; i < array.length; i++) {
      var pcount = array[i].replace(/^\s+/g, '');
      if (pcount == 'peopleCount') {
        modalText = 2;
        modalArray[0] = modalText;
        index = i + 1;
        modalArray[1] = index;
      } else {
        modalArray[0] = modalText;
      }
    }
  } else if (array.length > 8) {
    modalText = 1;
    modalArray[0] = modalText;
  }
  return modalArray
}
export function getVStatus(item) {
  //扩展字段
  var extendCol = '';
  if (item.extendCol != null) {
    extendCol = splitArray1(item.extendCol);
  } else {
    extendCol = splitArray1("");
  }
  //signinType ：1邀请访客2预约访客3常驻访客
  //0未添加自定义拜访模式1添加自定义拜访模式2团队拜访
  var modaltype = judgeModel(extendCol);
  var itemRemark;
  if (item.remark != undefined || item.remark != null) {
    var remark = item.remark;
    remark = remark.split('\n');
    itemRemark = remark[remark.length - 1];
    if (itemRemark == undefined || itemRemark == null) {
      itemRemark = "";
    }
  } else {
    itemRemark = "";
  }
  var permission = item.permission;
  const signStatus = i18n.messages[i18n.locale].signStatus
  var signText = signStatus[2],
    signClass = 'ordered',
    signColor = '#ef4f1f';
  if (parseInt(item.signinType) == 1) { //signinType = 1邀请访客
    var time_rec = new Date(item.visitdate); //签到时间
    var time_out = new Date(item.signOutDate); //签出时间
    var tiem_appoint = new Date(item.appointmentDate); //预约时间
    var sendStatusValue = item.status;
    if (sendStatusValue == 0) {
      signText = signStatus[4],
        signClass = 'send',
        signColor = '#35b22b';
    } else if (sendStatusValue == 1) {
      signText = signStatus[0],
        signClass = 'signin',
        signColor = '#35b22b';
    } else if (sendStatusValue == 2) {
      signText = signStatus[5],
        signClass = 'checked',
        signColor = '#996b33';
    } else if (sendStatusValue == 3) {
      signText = signStatus[6],
        signClass = 'accept',
        signColor = '#2c9ffd';
    } else if (sendStatusValue == 4) {
      signText = signStatus[7],
        signClass = 'refused',
        signColor = '#da231c';
    }
    if (item.visitdate && !item.signOutDate && item.appointmentDate) {
      signText = signStatus[0],
        signClass = 'signin',
        signColor = '#35b22b';
    } else if ((item.signOutDate && item.visitdate && item.appointmentDate) || (item.signOutDate)) {
      signText = signStatus[1],
        signClass = 'signout',
        signColor = '#2c9ffd';
    }

  } else if (parseInt(item.signinType) == 2) { //signinType = 2预约访客
    var time_rec = new Date(item.visitdate); //签到时间
    var time_out = new Date(item.signOutDate); //签出时间
    var tiem_appoint = new Date(item.appointmentDate); //预约时间
    if (item.signOutDate) {
      signText = signStatus[1],
        signClass = 'signout',
        signColor = '#2c9ffd';
    } else {
      if (item.appointmentDate && item.visitdate) {
        signText = signStatus[1],
          signClass = 'signin',
          signColor = '#35b22b';
      } else if (item.appointmentDate && item.visitdate && item.signOutDate) {
        signText = statusMessages.signStatus[1],
          signClass = 'signout',
          signColor = '#2c9ffd';
      } else {
        if (item.appointmentDate && !item.visitdate) {
          if (permission == 0) { //
            signText = signStatus[9],
              signClass = 'unauthored',
              signColor = '#e36200';
          } else if (permission == 1) { //
            signText = signStatus[8],
              signClass = 'authored',
              signColor = '#e7b000';
          } else if (permission == 2) {
            signText = signStatus[7],
              signClass = 'refused',
              signColor = '#da231c';
          } else {
            signText = signStatus[2],
              signClass = 'ordered',
              signColor = '#ef4f1f';
          }

        } else {
          signText = signStatus[0],
            signClass = 'signin',
            signColor = '#35b22b';
        }
      }
    }
  } else if (parseInt(item.signinType) == 3) { //signinType = 3常驻访客
    var time_rec = new Date(item.visitdate); //签到时间
    var time_out = new Date(item.signOutDate); //签出时间
    var tiem_appoint = new Date(item.appointmentDate); //预约时间
    if ((item.signOutDate && item.visitdate && item.appointmentDate) || (item.signOutDate)) {
      signText = signStatus[1],
        signClass = 'signout',
        signColor = '#2c9ffd';
    } else if (!item.signOutDate && item.visitdate) {
      signText = signStatus[0],
        signClass = 'signin',
        signColor = '#35b22b';
    }

  } else if (parseInt(item.signinType) == 0) { //signinType = 0 普通签到访客
    var time_rec = new Date(item.visitdate); //签到时间
    var time_out = new Date(item.signOutDate); //签出时间
    var tiem_appoint = new Date(item.appointmentDate); //预约时间
    if ((item.signOutDate && item.visitdate && item.appointmentDate) || (item.signOutDate)) {
      signText = signStatus[1],
        signClass = 'signout',
        signColor = '#2c9ffd';
    } else if (item.visitdate && !item.signOutDate) {
      signText = signStatus[0],
        signClass = 'signin',
        signColor = '#35b22b';
    } else if (!item.visitdate && !item.signOutDate) {
      signText = signStatus[2],
        signClass = 'ordered',
        signColor = '#ef4f1f';
    }
  }
  if (item.appointmentDate && !item.visitdate && !item.signOutDate) {
    var timeFlag = compareTime(new Date(item.appointmentDate), new Date());
    if (timeFlag) {
      signText = signStatus[3],
        signClass = 'outdate',
        signColor = '#996b33';
    }
  }
  var obj = {
    'text': signText,
    'color': signColor,
    'class': signClass
  }
  return obj
}

function compareTime(time1, time2) {
  var time1 = new Date(time1);
  var date1 = time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate();
  var time2 = new Date(time2);
  var date2 = time2.getFullYear() + '-' + (time2.getMonth() + 1) + '-' + time2.getDate();
  var compDate1 = new Date(Date.parse(date1.replace(/-/g, "/")));
  var compDate2 = new Date(Date.parse(date2.replace(/-/g, "/")));
  var t = (compDate1.getTime() - compDate2.getTime()) / 1000;
  if (parseInt(t / (24 * 60 * 60)) < 0) {
    return true
  } else if (parseInt(t / (24 * 60 * 60)) > 0) {
    return false
  } else {
    return false
  }
}
/* 获取链接中某一字符串赋值 */
export function getParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
export function groupStatusText(value) {
  switch (value) {
    case 0:
      return statusMessages.off
    case 1:
      return statusMessages.on
    case 2:
      return statusMessages.off
    default:
      return statusMessages.off
  }
}
export function stringToArray(value) {
  if (value && value !== '' && value !== 'null' && value !== null) {
    return value.split(',')
  } else {
    return []
  }
}
export function splitArray(string) {
  var vkeywords = /\,|\=/;
  if (string) {
    return string.split(vkeywords)
  } else {
    return []
  }
}
export function arrayToString(value) {
  if (value.length > 0) {
    return value.join(',')
  } else {
    return ''
  }
}
export function getComBarList(array, name, id, count) {
  let list = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[id],
      pcount: element[count],
      children: []
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    list.push(obj)
  })
  return list
}
export function getBarList(array, name, id, count, remark) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: '',
    pcount: 0,
    dp: 'root',
    remark: null,
    children: [],
    id: 0
  }]
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[id],
      pcount: element[count],
      children: [],
      remark: element[remark],
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    list[0].children.push(obj)
  })
  return list
}
export function getCBarList(array, name, id, child) {
  let list = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],
      name: element[name],
      pid: element[id],
      pcount: 0,
      type: 0,
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCRoleBarList(element[child], name, id, child)
      obj.children = citem
    }
    list.push(obj)
  })
  return list
}
export function getCRoleBarList(array, name, id, child) {
  let list = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],
      name: element[name],
      pid: element[id],
      pcount: 0,
      type: 1,
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCRoleBarList(element[child], name, id, child)
      obj.children = citem
    }
    list.push(obj)
  })
  return list
}
export function getCgBarAllList(array, name, did, count, dp, child) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: '',
    pcount: 0,
    dp: 'root',
    children: [],
    id: 0
  }]
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: [],
      id: element[did]
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    cList.push(obj)
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarAllChildList(element[child], name, did, count, dp, child)
      let newClist = cList.concat(citem)
      cList = newClist
    }
    
  })
  let newlist = list.concat(cList)
      list = newlist
  return list
}
export function getCgBarAllChildList(array, name, did, count, dp, child) {
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: [],
      id: element[did]
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    cList.push(obj)
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarAllChildList(element[child], name, did, count, dp, child)
      let newClist = cList.concat(citem)
      cList = newClist
    }
  })
  return cList
}
export function getCgBarList(array, name, did, count, dp, child,dpno) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: '',
    pcount: 0,
    dp: 'root',
    children: [],
    id: 0,
    dpRole: 'root'
  }]
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: [],
      id: element[did],
      dpno: element[dpno],
      dpRole: 'parent'
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarChildList(element[child], name, did, count, dp, child,dpno,element[did],element[dpno])
      obj.children = citem
    }
    cList.push(obj)
  })
  list[0].children = cList
  return list
}
export function getCgBarChildList(array, name, did, count, dp, child,dpno,parentid,parentno) {
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: [],
      id: element[did],
      dpno: element[dpno],
      dpRole: 'child',
      parentid: parentid,
      parentno: parentno
    }
    if (parseInt(element[count]) === 0) {
      obj.label = element[name]
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarChildList(element[child], name, did, count, dp,child,dpno,parentid,parentno)
      obj.children = citem
    }
    cList.push(obj)
  })
  return cList
}
export function getVisitList(array, name, did) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: '',
    pcount: 0,
    dp: 'root',
    children: [],
    id: 0,
    dpRole: 'root'
  }]
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name],// + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: 0,
      dp: 'child',
      children: [],
      id: element[did],
      dpno: 0,
      dpRole: 'parent'
    }
    cList.push(obj)
  })
  list[0].children = cList
  return list
}
//字符转换为UTF-8编码
//Export API
export function EncodeUtf8(s1) {
  var s = escape(s1);
  var sa = s.split("%");
  var retV = "";
  if (sa[0] != "") {
    retV = sa[0];
  }
  for (var i = 1; i < sa.length; i++) {
    if (sa[i].substring(0, 1) == "u") {
      retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
    } else {
      retV += "%" + sa[i];
    }
  }
  return retV;
}

function Str2Hex(s) {
  var c = "";
  var n;
  var ss = "0123456789ABCDEF";
  var digS = "";
  for (var i = 0; i < s.length; i++) {
    c = s.charAt(i);
    n = ss.indexOf(c);
    digS += Dec2Dig(eval(n));
  }
  return digS;
}

function Dec2Dig(n1) {
  var s = "";
  var n2 = 0;
  for (var i = 0; i < 4; i++) {
    n2 = Math.pow(2, 3 - i);
    if (n1 >= n2) {
      s += '1';
      n1 = n1 - n2;
    } else {
      s += '0';
    }
  }
  return s;
}

function Dig2Dec(s) {
  var retV = 0;
  if (s.length == 4) {
    for (var i = 0; i < 4; i++) {
      retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
    }
    return retV;
  }
  return -1;
}

function Hex2Utf8(s) {
  var retS = "";
  var tempS = "";
  var ss = "";
  if (s.length == 16) {
    tempS = "1110" + s.substring(0, 4);
    tempS += "10" + s.substring(4, 10);
    tempS += "10" + s.substring(10, 16);
    var sss = "0123456789ABCDEF";
    for (var i = 0; i < 3; i++) {
      retS += "%";
      ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
      retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
      retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
    }
    return retS;
  }
  return "";
}
//UTF-8编码的汉字转换为字符，特殊字符未处理
//Export API
export function chineseFromUtf8Url(strUtf8) {
  var bstr = "";
  var nOffset = 0; //   processing point on strUtf8 

  if (strUtf8 == "") {
    return "";
  }
  strUtf8 = strUtf8.toLowerCase();
  nOffset = strUtf8.indexOf("%e");

  if (nOffset == -1) {
    return strUtf8;
  }

  while (nOffset != -1) {
    bstr += strUtf8.substr(0, nOffset);
    strUtf8 = strUtf8.substr(nOffset, strUtf8.length - nOffset);
    if (strUtf8 == "" || strUtf8.length < 9) {
      return bstr;
    }

    bstr += utf8CodeToChineseChar(strUtf8.substr(0, 9));
    strUtf8 = strUtf8.substr(9, strUtf8.length - 9);
    nOffset = strUtf8.indexOf("%e");
  }

  return bstr + strUtf8;
}

function unicodeFromUtf8(strUtf8) {
  var bstr = "";
  var nTotalChars = strUtf8.length; //   total chars to be processed. 
  var nOffset = 0; //   processing point on strUtf8 
  var nRemainingBytes = nTotalChars; //   how many bytes left to be converted 
  var nOutputPosition = 0;
  var iCode, iCode1, iCode2; //   the value of the unicode. 

  while (nOffset < nTotalChars) {
    iCode = strUtf8.charCodeAt(nOffset);
    if ((iCode & 0x80) == 0) // 1 byte. 
    {
      if (nRemainingBytes < 1) // not enough data 
        break;
      bstr += String.fromCharCode(iCode & 0x7F);
      nOffset++;
      nRemainingBytes -= 1;
    } else if ((iCode & 0xE0) == 0xC0) // 2 bytes 
    {
      iCode1 = strUtf8.charCodeAt(nOffset + 1);
      if (nRemainingBytes < 2 || // not enough data 
        (iCode1 & 0xC0) != 0x80) // invalid pattern 
      {
        break;
      }

      bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
      nOffset += 2;
      nRemainingBytes -= 2;
    } else if ((iCode & 0xF0) == 0xE0) // 3 bytes 
    {
      iCode1 = strUtf8.charCodeAt(nOffset + 1);
      iCode2 = strUtf8.charCodeAt(nOffset + 2);
      if (nRemainingBytes < 3 || // not enough data 
        (iCode1 & 0xC0) != 0x80 || // invalid pattern 
        (iCode2 & 0xC0) != 0x80) {
        break;
      }

      bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
        ((iCode1 & 0x3F) << 6) |
        (iCode2 & 0x3F));
      nOffset += 3;
      nRemainingBytes -= 3;
    } else // 4 or more bytes   --   unsupported 
      break;
  }

  if (nRemainingBytes != 0) {
    // bad   UTF8   string. 
    return "";
  }

  return bstr;
}

function utf8CodeToChineseChar(strUtf8) {
  var iCode, iCode1, iCode2;
  iCode = parseInt("0x" + strUtf8.substr(1, 2));
  iCode1 = parseInt("0x" + strUtf8.substr(4, 2));
  iCode2 = parseInt("0x" + strUtf8.substr(7, 2));

  return String.fromCharCode(((iCode & 0x0F) << 12) |
    ((iCode1 & 0x3F) << 6) |
    (iCode2 & 0x3F));
}

export function isIE() { //ie?
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}
export function downMoban(url) {
  var browser = isIE();
  if (browser == true) {
    window.location.href = url;
  }
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    window.location.href = url;
  }
  window.open(url)
}
export function downloadDoc(params) {
  let url = getBaseUrl() + '/ExportVisitorList' + params
  var browser = isIE()
  if (browser == true) {
    window.location.href = url
  }
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    window.location.href = url
  }
  window.open(url)
}
export function exportEmpDoc(params) {
  let url = getBaseUrl() + '/ExportEmployeeList' + params
  var browser = isIE()
  if (browser == true) {
    window.location.href = url
  }
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    window.location.href = url
  }
  window.open(url)
}
export function formatMeetStatus(num) {
  switch (num) {
    case 0:
      return i18n.messages[getLanguage()].vstatus[0]
    case 1:
      return i18n.messages[getLanguage()].vstatus[2]
    case 2:
      return i18n.messages[getLanguage()].vstatus[3]
    case 3:
      return i18n.messages[getLanguage()].vstatus[4]
    case 4:
      return i18n.messages[getLanguage()].vstatus[3]
    default:
      return i18n.messages[getLanguage()].vstatus[0]
  }
}
export function formatMeetSendStatus(num) {
  switch (num) {
    case 0:
      return "发送成功"
    case 1:
      return "发送失败"
    case 2:
      return "发送失败"
    case 3:
      return "发送失败"
    case 4:
      return "发送失败"
    default:
      return "发送成功"
  }
}
export function judgeVtype(str) {
  if (str == 1) {
    return i18n.messages[getLanguage()].vtype[2]
  } else if (str == 0) {
    return i18n.messages[getLanguage()].people.emp
  } else if (str == 2) {
    return i18n.messages[getLanguage()].vtype[0]
  } else {
    return i18n.messages[getLanguage()].people.visit
  }
}
export function judgeRecordStatus(str) {
  if (str == true || str == "true" || str == 1) {
    return i18n.messages[getLanguage()].successText
  } else if (str == false || str == "false" || str == 0) {
    return i18n.messages[getLanguage()].errorText
  }
}
export function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}
export function getCharacter() {
  var character = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  return character
}
export function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
export function getHtmlDocName() {
  var str = window.location.href;
  str = str.substring(str.lastIndexOf("/") + 1);
  if (str.indexOf('?') > -1) {
    str = str.substring(0, str.lastIndexOf("?"));
  }
  str = str.substring(0, str.lastIndexOf("."));
  return str;
}
/* 判断拜访 */
export function judgeModel(array) {
  var modalText = 0; //0未添加自定义拜访模式1添加自定义拜访模式2团队拜访
  var index = 0;
  var modalArray = [];
  if (array.length > 0 && array.length <= 8) {
    for (var i = 0; i < array.length; i++) {
      var pcount = array[i].replace(/^\s+/g, '');
      if (pcount == 'peopleCount') {
        modalText = 2;
        modalArray[0] = modalText;
        index = i + 1;
        modalArray[1] = index;
      } else {
        modalArray[0] = modalText;
      }
    }
  } else if (array.length > 8) {
    modalText = 1;
    modalArray[0] = modalText;
  }
  return modalArray
}
export function moveBlank(str) {
  return str.replace(/\s+/g, "");
}
export function checkLanguage() {
  var lan = (navigator.browserLanguage || navigator.language).toLowerCase();
  if (lan.indexOf('en') > -1) {
    return 'en'
  } else if (lan.indexOf('zh-cn') > -1) {
    return 'zh'
  } else if (lan.indexOf('zh-hk') > -1) {
    return 'hk'
  } else {
    return 'en'
  }
}
export function isEmptyObject (obj) {
  for(var key in obj) {
    return false
  }
  return true
}
export function PrefixInteger (num,link,length) {
  //(num/Math.pow(10,length)).toFixed(length).substr(2)
  return link + (Array(length).join('0') + num).slice(-length)
}
/*   检测身份证   */
export function checkIdCard(idcard) {
    var Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }
    var Errors = new Array(

        "验证通过!",

        "身份证号码位数不对!",

        "身份证号码出生日期超出范围或含有非法字符!",

        "身份证号码校验错误!",

        "身份证地区非法!"

    );
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) {

        return Errors[4];
    }
    //身份号码位数及格式检验
    switch (idcard.length) {

        case 15:

            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {

                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性

            } else {

                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性

            }

            if (ereg.test(idcard)) {

                return Errors[0];
            } else {

                return Errors[2];
            }

            break;

        case 18:

            //18位身份号码检测

            //出生日期的合法性检查

            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))

            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))

            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {

                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式

            } else {

                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式

            }

            if (ereg.test(idcard)) { //测试出生日期的合法性

                //计算校验位

                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7

                    +
                    (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9

                    +
                    (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10

                    +
                    (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5

                    +
                    (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8

                    +
                    (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4

                    +
                    (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2

                    +
                    parseInt(idcard_array[7]) * 1

                    +
                    parseInt(idcard_array[8]) * 6

                    +
                    parseInt(idcard_array[9]) * 3;

                Y = S % 11;

                M = "F";

                JYM = "10X98765432";

                M = JYM.substr(Y, 1); //判断校验位

                if (M == idcard_array[17]) {

                    return Errors[0]; //检测ID的校验位
                } else {

                    return Errors[3];
                }

            } else {

                return Errors[2];
            }

            break;

        default:

            return Errors[1];

            break;

    }

}