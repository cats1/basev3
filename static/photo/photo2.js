var iframDom = window.parent.document.getElementById("ieframe")
var token = $(iframDom).attr('token')
var Interface = $(iframDom).attr('interface')
function webcamPhoto() {
  //var type = empEditType;
  var w = 320,
    h = 240;
  var pos = 0,
    ctx = null,
    saveCB;

  var canvas = document.getElementById("webcamcanvas")
  if (canvas.toDataURL) {
    ctx = canvas.getContext("2d");
    var image = ctx.getImageData(0, 0, w, h);

    saveCB = function(data) {
      var col = data.split(";");
      var img = image;

      for (var i = 0; i < 320; i++) {
        var tmp = parseInt(col[i]);
        img.data[pos + 0] = (tmp >> 16) & 0xff;
        img.data[pos + 1] = (tmp >> 8) & 0xff;
        img.data[pos + 2] = tmp & 0xff;
        img.data[pos + 3] = 0xff;
        pos += 4;
      }

      if (pos >= 4 * 320 * 240) {
        ctx.putImageData(img, 0, 0);
        var Imagedata = canvas.toDataURL().substring(22); //上传给后台的图片数据

        pos = 0;
      }
    };
  } else {
    var image = [];
    saveCB = function(data) {
      image.push(data);
      pos += 4 * 320;
      if (pos >= 4 * 320 * 240) {
        $.post(URL, { briStr: image.join(';') }, function(data) {
          console.log(data);
          //在页面显示base64图片处理
          pos = 0;
          image = [];
        });
      }
    };
  }
  jQuery("#webcam").webcam({
    width: 320,
    height: 240,
    mode: "callback",
    swffile: "./jscam_canvas_only.swf", // canvas only doesn't implement a jpeg encoder, so the file is much smaller
    onTick: function(remain) {
      if (0 == remain) {
        //jQuery("#status").text("Cheese!");
      } else {
        //jQuery("#status").text(remain + " seconds remaining...");
      }
    },

    onSave: saveCB,

    onCapture: function() {
      webcam.save();

      // Show a flash for example
    },

    debug: function(type, string) {
      // Write debug information to console.log() or a div, ...
    },

    onLoad: function() {
      // Page load
      var cams = webcam.getCameraList();
      for (var i in cams) {
        //jQuery("#cams").append("<li>" + cams[i] + "</li>");
      }
    }
  });
  $("#webcambtn").click(function() {
    webcam.capture(0);
  });
  document.getElementById("webcamsc").addEventListener("click", function() {
    var imgData = document.getElementById("webcamcanvas").toDataURL("image/png");
    //var mmmd = getBase64Image(document.getElementById("mmm"));
    var data = imgData.substr(22);
    $("body").attr('haha','888')
    //console.log(mmmd)
    UploadBase64Common(data, function(data) {
        $(iframDom).attr('dataurl',data.url)
    })
  });
}
function convertBase64UrlToBlob(urlData) {
    //去掉url的头，并转换为byte
    var bytes = window.atob(urlData.split(',')[1]);
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/jpeg'
    });
}
/* 上传图片upload common */
function UploadBase64Common(base64Codes, callback) {
    var form = new FormData();
    var photo = "data:image/png;base64," + base64Codes;
    var file = convertBase64UrlToBlob(photo);
    var responseJSON;
    var resultLength;
    form.enctype = "multipart/form-data";
    form.append('action', 'upload');
    form.append('filename', file, "upload.jpg");
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            responseJSON = $.parseJSON(xhr.responseText);
            if (responseJSON.status == 0) {
                var result = responseJSON.result;
                callback && callback(result);
            } else {
                //showAlert("图片上传失败", -1);
                return;
            }
        }
    };
    xhr.open('post', Interface + "/Upload", true);
    xhr.setRequestHeader("X-COOLVISIT-TOKEN", token);
    xhr.send(form);
}
webcamPhoto()
