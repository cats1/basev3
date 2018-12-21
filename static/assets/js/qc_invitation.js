/**
 * Created by doukc on 2016/1/18.
 */
//var Interface = "http://xzl.dejiplaza.com/qcvisit";
var ADD_PERSON = Interface + "/addPerson";
var UPLOAD_URL = Interface + "/Upload";
var UPDATE_APPOINTMENT_REPLY = Interface + "/updateAppointmentReply";
var upload_result;

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
    console.log(upload.value);
    var mform = document.getElementById('upload_form');
    var form = new FormData();
    var file = mform['upload_image'].files[0];
    var responseJSON;

    form.enctype = "multipart/form-data";
    form.append('action', 'upload');
    form.append('filename', file);

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            responseJSON = xhr.responseText;
            responseJSON = JSON.parse(responseJSON);
            upload_result = responseJSON.result.url;
            console.log(upload_result);
            document.getElementById('img_head').src = responseJSON.result.url;
            $("#tips").text('上传成功');
        }
    };

    xhr.onreadystatechange = stateChange("tips");
    xhr.open('post', UPLOAD_URL, true);
    //xhr.setRequestHeader('X-FIND-TOKEN',token);
    xhr.send(form);
}

function stateChange() {
    $("#tips").text('正在上传');
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
    var sendData = {
        "id": id,
        "photoUrl": upload_result
    };
    console.log(JSON.stringify(sendData));
    $("#tips").text('正在提交您的照片');
    var jqXHR = ajaxProc(sendData, ADD_PERSON);
    jqXHR.done(function (data) {
        console.log(data);
        //      if (data.status == 43) {
        //      	alert('上传的识别照片数量已经到达最大限制');
        //      }
        if (data.status != 0) {
            alert('上传照片失败,请检查网络后重试！');
            $("#tips").text('上传进度');
        } else if (data.status == 0) {
            $("#add_person h2").css('display', 'none');
            $("#add_person .compro").css('display', 'none');
            $("#add_person img.s3").css('display', 'none');
            $("#img_head").attr('src', 'https://www.coolvisit.com/assets/img/finish.png');
            //	$("#add_person").width('400px');
            //	$("#add_person").height('400px');
            $("#add_person").css('background-color', '#FFFFFF');
            $("#img_head").width('80%');
            $("#img_head").css('margin-top', '0');
            $("#tips").text('提交成功');
        }

    });

    jqXHR.fail(function () {
        alert('上传的识别照片失败，请联系管理员!');
        $("#tips").text('上传进度');
    });
}

$(function () {
    //	if ($_GET['id'] == undefined || $_GET['id'] == "") {
    //		alert('参数错误，请从短信通知中打开网页');
    //		window.location.href = 'http://www.coolvisit.com/';
    //	}	
    /*判断二维码区域是否被关闭*/
    if ($("#qrContent").length != 0) {
        var id = appid;
        //		var shaObj = new jsSHA("SHA-1", "TEXT");
        //		shaObj.update(id);
        //		var hash = shaObj.getHash("HEX");
        //		var qrCode = "";
        //	
        //		for (var i=8;i<27;i++) {
        //			qrCode = qrCode+hash[i];
        //		}
        // var qrCode = "1" + id;
        // var pHtml = '<p style="color:#353d4c;text-align:center;line-height:36px">串码：' + strqrcode + '</p>';
        // $("#qrContent").before(pHtml);
        console.log(strqrcode);
        var qrcodeObj = new QRCode(document.getElementById("qrContent"), {
            width: 230, //设置宽高
            height: 230
        });
        qrcodeObj.makeCode(strqrcode);
        $("#qrContent").css("margin-top", "1em");
        $("#add_person").css("margin-top", "0em");
    }
    /*微信专用标识，用于关闭微信邀请函中的按钮*/
    if ($_GET['review'] != undefined) {
        $("#fixed-buttonGroup").hide();
    } else if (appid == undefined || appid == "") {
        $("#fixed-buttonGroup").hide();
    }

    //	var containerWidth = $(".container").width();
    //	var containerHeight = $(".container").height();
    //	
    //	var fixedButtonGroup = $("#fixed-buttonGroup");
    //	fixedButtonGroup.width(containerWidth/1.5);
    //	fixedButtonGroup.height(containerWidth/3);
    //	var temp = containerWidth - (containerWidth/1.5);
    //	temp = temp/2;
    //	fixedButtonGroup.css('margin-left', temp);
    //	var top = $("#header").offset().top;
    //	$("#fixed-buttonGroup").offset({top: top});

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
                    fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                    setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
                }
            });
            jqXHR.fail(function (data) {
                console.log(data);
                buttonGroup.hide();
                $("#fixed-buttonGroup").append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
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
                fixedButtonGroup.append('<p class="groupTip">您的回执已经发送</p>');
                setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
            }
        });
        jqXHR.fail(function (data) {
            buttonGroup.hide();
            fixedButtonGroup.append('<p class="groupTip">您的回执发送失败,请联系管理员</p>');
            setTimeout('$("#fixed-buttonGroup").fadeOut();', 3000);
        });
    });
});