/**
 * Created by doukc on 2016/1/18.
 */
//var Interface = "http://xzl.dejiplaza.com/qcvisit";
var ADD_PERSON = Interface + "/addPerson";
var UPLOAD_URL = Interface + "/Upload";
var ADD_PERSON_BY_IPHONE = Interface + "/addPersonByIphone";
var UPDATE_APPOINTMENT_REPLY = Interface + "/updateAppointmentReply";
var upload_result;
var fileType;
var isiOS;
var base64;


/**
 * 单击图片时调用input file控件的浏览器窗口
 */
function upload_click() {
    var upload = document.getElementById('upload_image');
    upload.click();
}

/**
 * 当input file控件内容变化时，进行上传
 */
function upload_change() {
    var upload = document.getElementById('upload_image');
    var mform = document.getElementById('upload_form');
    var form = new FormData();
    var file = mform['upload_image'].files[0];
    fileType = upload.value.toString();
    var responseJSON;

    //判断上传文件的后缀名
    var fileName = ['jpg', 'JPG', 'PNG', 'png', 'Jpg', 'Png'];
    var isType = false;
    fileType = fileType.split('.');
    fileType = fileType[fileType.length - 1];
    var len = fileName.length;
    for (var i = 0; i < len; i++) {
        if (fileName[i] === fileType) {
            isType = true;
            continue;
        }
    }

    if (isType) {
        form.enctype = "multipart/form-data";
        form.append('action', 'upload');
        form.append('filename', file);
        console.log(file);

        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (xhr.status == 200) {

                responseJSON = xhr.responseText;
                responseJSON = JSON.parse(responseJSON);
                upload_result = responseJSON.result.url;
                console.log(upload_result);
                //document.getElementById('img_head').src = responseJSON.result.url;
                if (isiOS) {
                    sendiOSImage(file);
                } else {
                    $("#img_head").attr('src', upload_result);
                }
                stateChange(1);
            }
        };

        xhr.onreadystatechange = stateChange(0);
        xhr.open('post', UPLOAD_URL, true);
        //xhr.setRequestHeader('X-FIND-TOKEN',token);
        xhr.send(form);
    } else {
        alert('请选择正确格式的照片进行上传');
    }


}

/**
 * 设置上传进度提示文字内容
 */
function stateChange(status) {
    var tips = $("div#add_person p:last");
    switch (status) {
        case 0:
            tips.text("上传照片中");
            break;
        case 1:
            tips.text("照片上传完毕");
            break;
        case 2:
            tips.text("照片发送中");
            break;
        default:
    }
}

function sendiOSImage(file) {
    //获取图片元信息
    var Orientation = null;
    EXIF.getData(file, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, 'Orientation');
    });
    console.log(Orientation);
    var oReader = new FileReader();
    oReader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
            var expectWidth = this.naturalWidth;
            var expectHeight = this.naturalHeight;

            if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                expectWidth = 800;
                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                expectHeight = 1200;
                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
            }
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

            //修复ios  
            //if (navigator.userAgent.match(/iphone/i)) {  
            if (isiOS) {
                //console.log(expectWidth + ',' + expectHeight);  
                //如果方向角不为1，都需要进行旋转 added by lzk  
                if (Orientation != "" && Orientation != 1) {
                    console.log('旋转处理');
                    switch (Orientation) {
                        case 6: //需要顺时针（向左）90度旋转  
                            console.log('需要顺时针（向左）90度旋转');
                            rotateImg(this, 'left', canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转  
                            console.log('需要顺时针（向右）90度旋转');
                            rotateImg(this, 'right', canvas);
                            break;
                        case 3: //需要180度旋转  
                        case 3: //需要180度旋转  
                            console.log('需要180度旋转');
                            rotateImg(this, 'right', canvas); //转两次  
                            rotateImg(this, 'right', canvas);
                            break;
                    }
                }

                base64 = canvas.toDataURL("image/jpeg", 0.8);
                console.log(base64);
            } else if (navigator.userAgent.match(/Android/i)) { // 修复android
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
            } else {
                //alert(Orientation);  
                if (Orientation != "" && Orientation != 1) {
                    //alert('旋转处理');  
                    switch (Orientation) {
                        case 6: //需要顺时针（向左）90度旋转  
                            console.log('需要顺时针（向左）90度旋转');
                            rotateImg(this, 'left', canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转  
                            console.log('需要顺时针（向右）90度旋转');
                            rotateImg(this, 'right', canvas);
                            break;
                        case 3: //需要180度旋转  
                            console.log('需要180度旋转');
                            rotateImg(this, 'right', canvas); //转两次  
                            rotateImg(this, 'right', canvas);
                            break;
                    }
                }
                base64 = canvas.toDataURL("image/jpeg", 0.8);
            }
            $("#img_head").attr("src", base64);
            console.log(base64);
        };
    };
    oReader.readAsDataURL(file);
}




/**
 * undo按钮的监听函数
 */
function undo() {
    var upload = document.getElementById('upload_image');
    upload.click();
}

/**
 * send按钮的监听函数
 */
function send() {
    var id = appid;
    var path;
    /*
    if (fileType === 'jpg' || fileType === 'JPG' || fileType === 'Jpg') {
        upload_result = upload_result+".320x320.jpg";
    }
    else {
        upload_result = upload_result+".320x320.png";
    }*/

    if (isiOS) {
        var sendData = {
            "id": id,
            "photoUrl": upload_result,
            "image": base64
        }
        path = ADD_PERSON_BY_IPHONE;
    } else {
        var sendData = {
            "id": id,
            "photoUrl": upload_result
        }
        path = ADD_PERSON;
    };


    console.log(JSON.stringify(sendData));

    var jqXHR = $.ajax({
        url: path,
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        type: 'post',
        timeout: 10000,
        /*headers: {
          'X-COOLVISIT-TOKEN': xtoken
        },*/
        beforeSend: function() {
            stateChange(2);
        }
    });


    jqXHR.done(function(data) {
        if (data.status != 0) {
            alert('人脸识别 检测失败!');
        } else if (data.status == 0) {
            $("#add_person h2").remove();
            $("#add_person .compro").remove();
            $("#add_person img.s3").remove();
            $("#tips").remove();
            $("#add_person form").remove();
            $("#img_head").attr('src', 'https://www.coolvisit.com/assets/img/v1/plane1.jpg');
            $("#img_head").css('margin-top', '0');
            $("#img_head").css('width', '80%');
            $("#img_head").css('height', 'auto');
            $("#add_person").css('background-color', 'white');
        }
    });

    jqXHR.fail(function() {
        alert('上传的识别照片失败，请联系管理员!');
    });
}

/**
 * 初始化
 */
$(function() {
    isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //  if ($_GET['id'] == undefined || $_GET['id'] == "") {
    //      alert('参数错误，请从短信通知中打开网页');
    //      window.location.href = 'http://www.coolvisit.com/';
    //  }

    $("section.s2:nth-child(4)").css('margin-top', 0);

    if ($("#codewrap").length != 0) {
        var id = appid;
        //      var shaObj = new jsSHA("SHA-1", "TEXT");
        //      shaObj.update(id);
        //      var hash = shaObj.getHash("HEX");
        //      var qrCode = "";
        //      
        //      for (var i=8;i<27;i++) {
        //          qrCode = qrCode+hash[i];
        //      }
        // var qrCode = "1" + id;
        // var pHtml = '<p style="color:#353d4c;text-align:center;line-height:36px">串码：' + qrCode + '</p>';
        // $("#codewrap").before(pHtml);
        console.log(strqrcode);
        if ($("#codewrap").length != 0) {
            var qrcode = new QRCode(document.getElementById("codewrap"), {
                width: 190, //设置宽高
                height: 190
            });
            qrcode.makeCode(strqrcode);
            $("#codewrap").css("margin-top", "1em");
            $("#add_person").css("margin-top", "0em");
        }
    }
    $("#add_person").css("width", "100%");
    /*微信专用标识，用于关闭微信邀请函中的按钮*/
    if ($_GET['review'] != undefined) {
        $("#fixed-buttonGroup").hide();
    } else if (appid == undefined || appid == "") {
        $("#fixed-buttonGroup").hide();
    }

    //  var containerWidth = $(".container").width();
    //  var containerHeight = $(".container").height();
    //  console.log(containerHeight, containerWidth);
    //  var fixedButtonGroup = $("#fixed-buttonGroup");
    //  fixedButtonGroup.width(containerWidth/1.5);
    //  fixedButtonGroup.height(containerWidth/3);
    //  var temp = containerWidth - (containerWidth/1.5);
    //  temp = temp/2;
    //  fixedButtonGroup.css('margin-left', temp);
    //  var top = $("#header").offset().top;
    //  $("#fixed-buttonGroup").offset({top: top});
    var containerWidth = $(".container").width();
    $("#fixed-buttonGroup").width(containerWidth);

    $("#blueGradients").click(function() {
        var secureprotoFlag = false;
        if ($(".secureproto").html() == undefined || $(".secureproto").html() == "") {
            secureprotoFlag = true;
        } else {
            if ($("#securechoice").prop("checked") == true) {
                secureprotoFlag = true;
            } else {
                alert("请先接受安全协议");
                return false;
            }
        }
        if (secureprotoFlag) {
            var sendData = {
                id: $_GET['id'],
                status: 3
            };

            var fixedButtonGroup = $("#fixed-buttonGroup");
            var buttonGroup = $("#fixed-buttonGroup button");

            var sendData = {
                id: $_GET['id'],
                status: 3
            };

            var jqXHR = ajaxProc(sendData, UPDATE_APPOINTMENT_REPLY);
            jqXHR.done(function(data) {
                console.log(data);
                if (data.status == 0) {
                    buttonGroup.hide();
                    fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                    setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
                }
            });
            jqXHR.fail(function(data) {
                console.log(data);
                buttonGroup.hide();
                $("#fixed-buttonGroup").append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
                setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
            });
        }
    });

    $("#redGradients").click(function() {
        var fixedButtonGroup = $("#fixed-buttonGroup");
        var buttonGroup = $("#fixed-buttonGroup button");

        var sendData = {
            id: $_GET['id'],
            status: 4
        };

        var jqXHR = ajaxProc(sendData, UPDATE_APPOINTMENT_REPLY);
        jqXHR.done(function(data) {
            console.log(data);
            if (data.status == 0) {
                buttonGroup.hide();
                fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
            }
        });
        jqXHR.fail(function(data) {
            buttonGroup.hide();
            fixedButtonGroup.append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
            setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
        });
    });
});


//对图片旋转处理 added by lzk  
function rotateImg(img, direction, canvas) {
    //alert(img);  
    //最小与最大旋转方向，图片旋转4次后回到原方向    
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);    
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');    
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //img.setAttribute('step', step);    
    /*var canvas = document.getElementById('pic_' + pid);   
    if (canvas == null) {   
        img.style.display = 'none';   
        canvas = document.createElement('canvas');   
        canvas.setAttribute('id', 'pic_' + pid);   
        img.parentNode.appendChild(canvas);   
    }  */
    //旋转角度以弧度值为参数    
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}
