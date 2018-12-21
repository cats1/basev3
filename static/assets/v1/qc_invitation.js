/**
 * Created by doukc on 2016/1/18.
 */
var Interface = "http://avaya.coolvisit.top/qcvisit/";

var ADD_PERSON = Interface + "addPerson";
var UPLOAD_URL = Interface + "Upload";

var UPDATE_APPOINTMENT_REPLY = Interface + "updateAppointmentReply";
var upload_result;
var isAndroid = false;
var isiOS = false;
var base64 = "";
var GET_QRCODE_FORPZ = Interface + "getQrcode";

var isEng = true;
/**
 * 单击图片时调用input file控件的浏览器窗口
 */
function upload_click() {
    var upload = document.getElementById('upload_image');
    upload.click();
}

function getBlobBydataURI(dataURI, type) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
        type: type
    });
}

/**
 * 当input file控件内容变化时，进行上传
 */
function upload_change() {
    var upload = document.getElementById('upload_image');
    var mform = document.getElementById('upload_form');
    var form = new FormData();
    var file = mform['upload_image'].files[0];
    var responseJSON;
    var blob;
    var Orientation = null;

    var reader = new FileReader();
    var canvas = '<canvas id="can" style="position: absolute; top: 100px; display:none"></canvas>';
    $('body').append(canvas);

    EXIF.getData(file, function () {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, 'Orientation');
    });

    reader.readAsDataURL(file);
    reader.onload = function (e) {
        if (isAndroid) {
            // document.getElementById('img_head').src = reader.result;
            // var img = document.getElementById("img_head");
            var img = new Image();
            img.src = e.target.result;
            console.log(reader.result.length);
            img.onload = function () {
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
                canvas.width = expectWidth * 0.5;
                canvas.height = expectHeight * 0.5;
                ctx.drawImage(this, 0, 0, expectWidth * 0.5, expectHeight * 0.5);
                console.log(Orientation);
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6: //需要顺时针（向左）90度旋转  
                            rotateImg(this, 'left', canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转  
                            rotateImg(this, 'right', canvas);
                            break;
                        case 3: //需要180度旋转  
                            rotateImg(this, 'right', canvas); //转两次  
                            rotateImg(this, 'right', canvas);
                            break;
                    }
                }

                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(this, 0, 0, expectWidth * 0.5, expectHeight * 0.5);
                base64 = canvas.toDataURL("image/jpeg", 0.3);

                document.getElementById('img_head').src = base64;
                uploadImage();
            };
        } else if (isiOS) {
            var img = new Image();
            img.src = e.target.result;
            console.log(reader.result.length);
            img.onload = function () {
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
                canvas.width = expectWidth * 0.5;
                canvas.height = expectHeight * 0.5;
                ctx.drawImage(this, 0, 0, expectWidth * 0.5, expectHeight * 0.5);
                console.log(Orientation);
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6: //需要顺时针（向左）90度旋转  
                            rotateImg(this, 'left', canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转  
                            rotateImg(this, 'right', canvas);
                            break;
                        case 3: //需要180度旋转  
                            rotateImg(this, 'right', canvas); //转两次  
                            rotateImg(this, 'right', canvas);
                            break;
                    }
                }

                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
                ctx.scale(0.5, 0.5);
                ctx.drawImage(this, 0, 0, expectWidth * 0.5, expectHeight * 0.5);

                base64 = canvas.toDataURL("image/jpeg", .3);
                document.getElementById('img_head').src = base64;

                uploadImage();
            };
        }
    };
}

function uploadImage() {
    var blob = getBlobBydataURI(base64, 'image/jpg');
    var formData = new FormData();
    formData.enctype = "multipart/form-data";
    formData.append('action', 'upload');
    formData.append("filename", blob, "upload.jpg");

    var xhr = $.ajax({
        type: "post",
        url: UPLOAD_URL,
        async: true,
        data: formData,
        processData: false,
        cache: false,
        contentType: false,
        beforeSend: stateChange("tips")
    });
    xhr.done(function (data) {
        console.log(data)
        upload_result = data.result.url;
        var img = document.getElementById('img_head');

        img.src = data.result.url;
        img.onload = function () {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            canvas.width = 240;
            canvas.height = 320;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            var code = canvas.toDataURL("image/jpeg", 1);

            var blob = getBlobBydataURI(code, 'image/jpg');
            var formData = new FormData();
            formData.enctype = "multipart/form-data";
            formData.append('action', 'upload');
            formData.append("filename", blob, "upload.jpg");

            var xhr = $.ajax({
                type: "post",
                url: UPLOAD_URL,
                async: true,
                data: formData,
                processData: false,
                cache: false,
                contentType: false,
                beforeSend: stateChange("tips")
            });

            xhr.done(function (data) {
                console.log(data)
                upload_result = data.result.url;
                if (isEng) {
                    $("#tips").text('Uploaded successfully');
                }
                else {
                    $("#tips").text('上传成功');
                }
            });
        }
    });
}

function stateChange() {
    if (isEng) {
        $("#tips").text('Uploading');
    }
    else {
        $("#tips").text('正在上传');
    }
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
    var sendData = {
        "id": id,
        "photoUrl": upload_result
    };

    if (isiOS) {
        sendData = {
            "id": id,
            "photoUrl": upload_result,
            "image": base64
        }
        path = ADD_PERSON;
    } else {
        sendData = {
            "id": id,
            "photoUrl": upload_result
        }
        path = ADD_PERSON;
    };

    if (isEng) {
        $("#tips").text("Submitting your photos");
    }
    else {
        $("#tips").text('正在提交您的照片');
    }
    var jqXHR = ajaxProc(sendData, path);
    jqXHR.done(function (data) {
        console.log(data);
        if (data.status != 0) {
            if (isEng) {
                alert("Failed to upload. Please check the network and try again!");
                $("#tips").text('Waiting for upload');
            }
            else {
                alert('上传照片失败,请检查网络后重试！');
                $("#tips").text('上传进度');
            }
        } else if (data.status == 0) {
            // var result = JSON.parse(data.result);
            if (data.status === 0) {
                $("#add_person h2").css('display', 'none');
                $("#add_person .compro").css('display', 'none');
                $("#add_person img.s3").css('display', 'none');
                $("#img_head").attr('src', 'https://www.coolvisit.com/assets/img/finish.png');
                //  $("#add_person").width('400px');
                //  $("#add_person").height('400px');
                $("#add_person").css('background-color', '#FFFFFF');
                $("#img_head").width('80%');
                $("#img_head").css('margin-top', '0');
                if (isEng) {
                    $("#tips").text('Submitted successfully');
                }
                else {
                    $("#tips").text('提交成功');
                }
            }
            // else if (parseInt(result.rtn) == -6144) {
            //     if (isEng) {
            //         alert("The user's avatar already exists");
            //     }
            //     else {
            //         alert('该用户头像已存在');
            //     }
            // }
            // else {
            //     alert(result.message);
            // }
        }
    });

    jqXHR.fail(function () {
        if (isEng) {
            alert('Failed to upload photos. Please try again!');
            $("#tips").text('Waiting for upload');
        }
        else {
            alert('上传的识别照片失败，请联系管理员!');
            $("#tips").text('上传进度');
        }
    });
}

$(function () {
    var language = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (language.indexOf('en') > -1) {
        isEng = true;
    } else {
        isEng = false;
    }

    if (isEng) {
        $("#blueGradients").text("Accept");
        $("#redGradients").text("Reject");
        $("body > div.container > section:nth-child(4) > div:nth-child(1) > h2").text("SCAN QRCODE");
        $("body > div.container > section:nth-child(6) > h2").text("Parking information");
        $("body > div > section.s2 > h2").text("Company Address");
        $("body > div.container > section:nth-child(4) > div:nth-child(1) > p:nth-child(2)").text("Use the QR code to scan");
        $("body > div.container > section:nth-child(5) > h2").text("Company Profile");
        $("#mapwrap > a").css('background', 'url("https://www.coolvisit.com/assets/img/gohere2.png") center no-repeat');
        $("#add_person > h2").text("Open door with face recognition");
        $("#add_person > p.compro").text("Please click on the photo area below to upload positive face photos");
        $("#tips").text("Waiting for upload");
    }

    var u = navigator.userAgent;
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //  if ($_GET['id'] == undefined || $_GET['id'] == "") {
    //      alert('参数错误，请从短信通知中打开网页');
    //      window.location.href = 'http://www.coolvisit.com/';
    //  }   
    /*判断二维码区域是否被关闭*/
    if ($("#qrContent").length != 0) {
        var id = appid;
        //      var shaObj = new jsSHA("SHA-1", "TEXT");
        //      shaObj.update(id);
        //      var hash = shaObj.getHash("HEX");
        //      var qrCode = "";
        //  
        //      for (var i=8;i<27;i++) {
        //          qrCode = qrCode+hash[i];
        //      }

        console.log(strqrcode);
        var qrcodeObj = new QRCode(document.getElementById("qrContent"), {
            width: 230, //设置宽高
            height: 230
        });
        qrcodeObj.makeCode(strqrcode);
        $("#qrContent").css("margin-top", "1em");
        $("#add_person").css("margin-top", "0em");

        // var sendData = {
        //     type: 2,
        //     ctype: 23,
        //     aid: id
        // };
        // var jqXHR = ajaxProc(sendData, GET_QRCODE_FORPZ);
        // jqXHR.done(function (data) {
        //     if (data.status == 0) {
        //         // var strqrcode = JSON.parse(data.result).data;
        //         var strqrcode = data.result;
        //         var qrcodeObj = new QRCode(document.getElementById("qrContent"), {
        //             width: 230, //设置宽高
        //             height: 230
        //         });
        //         qrcodeObj.makeCode(strqrcode);
        //         $("#qrContent").css("margin-top", "1em");
        //         $("#add_person").css("margin-top", "0em");
        //     }
        // });
        // jqXHR.fail(function (data) {
        //     console.log(data);
        // });
    }
    /*微信专用标识，用于关闭微信邀请函中的按钮*/
    if ($_GET['review'] != undefined) {
        $("#fixed-buttonGroup").hide();
    } else if (appid == undefined || appid == "") {
        $("#fixed-buttonGroup").hide();
    }

    //  var containerWidth = $(".container").width();
    //  var containerHeight = $(".container").height();
    //  
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

    $("#blueGradients").click(function () {
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
            var fixedButtonGroup = $("#fixed-buttonGroup");
            var buttonGroup = $("#fixed-buttonGroup button");

            var sendData = {
                id: $_GET['id'],
                status: 3
            };

            var jqXHR = ajaxProc(sendData, UPDATE_APPOINTMENT_REPLY);
            jqXHR.done(function (data) {
                console.log(data);
                if (data.status == 0) {
                    buttonGroup.hide();
                    if (isEng) {
                        fixedButtonGroup.append('<p class="groupTip">Your receipt has been sent</p>');
                    }
                    else {
                        fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                    }
                    setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
                }
            });
            jqXHR.fail(function (data) {
                console.log(data);
                buttonGroup.hide();
                if (isEng) {
                    $("#fixed-buttonGroup").append('<p class="groupTip">Your receipt failed to send. Please try again</p>');
                }
                else {
                    $("#fixed-buttonGroup").append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
                }
                setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
            });
        }

    });

    $("#redGradients").click(function () {
        var fixedButtonGroup = $("#fixed-buttonGroup");
        var buttonGroup = $("#fixed-buttonGroup button");

        var sendData = {
            id: $_GET['id'],
            status: 4
        };
        var jqXHR = ajaxProc(sendData, UPDATE_APPOINTMENT_REPLY);
        jqXHR.done(function (data) {
            console.log(data);
            if (data.status == 0) {
                buttonGroup.hide();
                if (isEng) {
                    fixedButtonGroup.append('<p class="groupTip">Your receipt has been sent</p>');
                }
                else {
                    fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                }
                setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
            }
        });
        jqXHR.fail(function (data) {
            buttonGroup.hide();
            if (isEng) {
                $("#fixed-buttonGroup").append('<p class="groupTip">Your receipt failed to send. Please try again</p>');
            }
            else {
                $("#fixed-buttonGroup").append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
            }
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