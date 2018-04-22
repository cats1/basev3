import { getCache } from './auth'
//const Base64 = require('./base64')
let Base64 = require('js-base64').Base64;
console.log(Base64)
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
//
export function booleanToNumber(boo) {
  return boo === true ? 1 : 0
}
//
export function numberToBoolean(num) {
  return parseInt(num) === 1 ? true : false
}
export function valueToString(value) {
  console.log(value)
  if (value === null) {
    return ''
  } else {
    return value.toString()
  }
}
export function replaceQuotation(value) {
  return value.replace(/\"/g, '\\\"');
}
export function checkIsNull(str) {
  if (str == null || str == 'null' || str == undefined || str == "") {
    return ""
  } else {
    return str
  }
}
export function replaceRemoveQuotation(value) {
  return value.replace(/\\\"/g, '"');
}
export function groupStatusText(value) {
  switch (value) {
    case 0:
      return '停用'
    case 1:
      return '启用'
    default:
      return '启用'
  }
}
export function stringToArray(value) {
  if (value && value !== '' && value !== 'null' && value !== null) {
    return value.split(',')
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
export function getBarList(array, name, id, count) {
  let list = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name] + '(' + element[count] + ')',
      name: element[name],
      pid: element[id],
      pcount: element[count],
      children: []
    }
    list.push(obj)
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
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCBarList(element[child], name, id, child)
      obj.children = citem
    }
    list.push(obj)
  })
  return list
}
export function getCgBarList(array, name, did, count, dp, child) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: getCache('userid'),
    pcount: 0,
    dp: 'root',
    children: []
  }]
  let cList = []
  array.forEach(function(element, index) {
    let obj = {
      label: element[name] + '(' + element[count] + ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarList(element[child], name, did, count, dp, child)
      obj.children = citem
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

function isIE() { //ie?
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
  let url = process.env.BASE_API + '/ExportVisitorList' + params
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
      return "已发送"
    case 1:
      return "已查看"
    case 2:
      return "已接受"
    case 3:
      return "已拒绝"
    case 4:
      return "已接受"
    default:
      return "已发送"
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
