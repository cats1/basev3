/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path 
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
export function dealImage(path, obj, callback) {
  var img = new Image();
  img.src = path;
  img.setAttribute("crossOrigin", 'Anonymous');
  img.onload = function() {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7; // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);

    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64);
  }
}
/*
  三个参数
  file：一个是文件(类型是图片格式)，
  w：一个是文件压缩的后宽度，宽度越小，字节越小
  objDiv：一个是容器或者回调函数
  photoCompress()
*/
export function photoCompress(file, w, objDiv) {
  var ready = new FileReader();
  /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file);
  ready.onload = function() {
    var re = this.result;
    canvasDataURL(re, w, objDiv)
  }
}

function canvasDataURL(path, obj, callback) {
  var img = new Image();
  img.src = path;
  img.onload = function() {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7; // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
  }
}
/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */
export function convertBase64UrlToBlob(urlData) {
  var arr = urlData.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
