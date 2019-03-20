//判断输入密码的类型
function CharMode(iN) {
  if (iN >= 48 && iN <= 57) //数字
    return 1;
  if (iN >= 65 && iN <= 90) //大写
    return 2;
  if (iN >= 97 && iN <= 122) //小写
    return 4;
  else
    return 8;
}
//bitTotal函数
//计算密码模式
function bitTotal(num) {
  let modes = 0
  for (let i = 0; i < 4; i++) {
    if (num & 1)
    modes++
    num >>>= 1
  }
  return modes
}
//返回强度级别
export function checkStrong(sPW) {
  
  if (sPW.length < 6)
    return 0 //密码太短，不检测级别
  let Modes = 0
  for (let i = 0; i < sPW.length; i++) {
    //密码模式
    Modes |= CharMode(sPW.charCodeAt(i))
  }
  return bitTotal(Modes)
}

//显示颜色
export function pwStrength(pwd) {
  let Dfault_color = '#eeeeee' //默认颜色
  let L_color = '#FF0000' //低强度的颜色，且只显示在最左边的单元格中
  let M_color = '#FF9900' //中等强度的颜色，且只显示在左边两个单元格中
  let H_color = '#33CC00' //高强度的颜色，三个单元格都显示
  let Pcolor
  if (pwd == null || pwd == '') {
    Pcolor = Dfault_color
  } else {
    let S_level = checkStrong(pwd)
    switch (S_level) {
      case 0:
        Pcolor = Dfault_color
        break
      case 1:
        Pcolor = L_color
        break
      case 2:
        Pcolor = M_color
        break
      default:
        Pcolor = H_color
    }
  }
  return Pcolor
}
