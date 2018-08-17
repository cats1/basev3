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
        jQuery("#status").text("Cheese!");
      } else {
        jQuery("#status").text(remain + " seconds remaining...");
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
        jQuery("#cams").append("<li>" + cams[i] + "</li>");
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
    //console.log(mmmd)
    /*UploadBase64Common(data, function(data) {
        var url = data.url;
        photoSuccess(url, type);
    })*/
  });
}
//webcamPhoto()
function init() {
  let flash = document.createElement("embed");
  flash.setAttribute("src", './MyCamera.swf');
  flash.setAttribute("style", "z-index:100");
  flash.setAttribute("pluginspage", "http://www.macromedia.com/go/getflashplayer");
  flash.setAttribute("quality", "high");
  flash.setAttribute("allowscriptaccess", "sameDomain");
  flash.setAttribute("wmode", "transparent");
  flash.setAttribute("type", "application/x-shockwave-flash");
  flash.setAttribute("id", "camera");
  flash.setAttribute("align", "middle");
  flash.setAttribute("name", "My_Cam");

  document.getElementById("cameraPanel").appendChild(flash);
}
init()