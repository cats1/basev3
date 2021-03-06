var nowVersion = "v2.1.0";
var vHeight = document.documentElement.clientHeight;
/* 获取省份 */
function getProvinces(callback){
    PostAjaxWithToken({}, "/GetProvinces", function(data){
      callback&&callback(data.result)
    });
}
/* 获取市份 */
function getCities(rid,callback){
    PostAjaxWithToken({
        'regionId': rid
    }, "/GetCities", function(data){
      callback&&callback(data.result)
    });
}
/* 获取区 */
function getDistricts(rid,callback){
    PostAjaxWithToken({
        'regionId': rid
    }, "/GetDistricts", function(data){
      callback&&callback(data.result)
    });
}
/* 获取当年 */
function getCurYear() {
    var time = new Date();
    return time.getFullYear();
}

function checkIsNull(str) {
    if (str == null || str == 'null') {
        return ""
    } else {
        return str
    }
}

function loginOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "signin.html"
}

function goEmployees() {
    if (getCache('subAccount') == 1) {
        window.location.href = 'employees.html'
    } else {
        window.location.href = 'emplist.html'
    }
}
/*
  element must be without padding
*/
function scrollFix(ele, offset) {
    var first = 1;
    var top = 0;
    var ele_width = 0;
    var ele_height = 0;
    $(window).scroll(function() {
        if (first) {
            top = $(ele).offset().top - offset;
            ele_width = $(ele).width();
            ele_height = $(ele).outerHeight();
            first = 0;
        }

        var current_top = $("body").scrollTop();
        if (current_top > top) {
            $(ele).css({ "position": "fixed", top: "0", "width": ele_width, "padding-top": offset, "z-index": "999" });
            $(ele).addClass("ele_fixed");
            $(ele).parent().addClass("ele_fixed_parent");
            $(ele).parent().css("padding-top", ele_height);
        } else {
            $(ele).css({ "position": "relative", top: "auto", "padding-top": "0" });
            $(ele).removeClass("ele_fixed");
            $(ele).parent().removeClass("ele_fixed_parent");
            $(ele).parent().css("padding-top", "0");
        }
    });

}

function scrollFixRight(ele, offset) {
    var first = 1;
    var top = 0;
    var ele_width = 0;
    var ele_height = 0;
    $(window).scroll(function() {

        if (first) {
            top = $(ele).offset().top - offset;
            ele_width = $(ele).width();
            ele_height = $(ele).outerHeight();
            first = 0;
        }

        var current_top = $("body").scrollTop();
        if (current_top > top) {
            $(ele).css({ "position": "fixed", top: "0", "width": ele_width, "z-index": "999" });
            $(ele).addClass("ele_fixed");
            $(ele).parent().addClass("ele_fixed_parent");
            $(ele).parent().css("padding-top", ele_height);
        } else {
            $(ele).css({ "position": "relative", top: "auto" });
            $(ele).removeClass("ele_fixed");
            $(ele).parent().removeClass("ele_fixed_parent");
            $(ele).parent().css("padding-top", "0");
        }
    });

}
/* 获取链接中某一字符串赋值 */
function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function scrollFixMargin(ele, offset) {
    var first = 1;
    var top = 0;
    var ele_width = 0;
    var ele_height = 0;
    $(window).scroll(function() {

        if (first) {
            top = $(ele).offset().top - offset;
            ele_width = $(ele).width();
            ele_height = $(ele).outerHeight();
            first = 0;
        }

        var current_top = $("body").scrollTop();
        if (current_top > top) {
            $(ele).css({ "position": "fixed", top: "0", "padding-top": "0", "width": "auto", "margin-top": offset, "z-index": "999" });
            $(ele).addClass("ele_fixed");
            $(ele).parent().addClass("ele_fixed_parent");
            $(ele).parent().css("margin-top", ele_height);
        } else {
            $(ele).css({ "position": "relative", top: "auto", "margin-top": "0" });
            $(ele).removeClass("ele_fixed");
            $(ele).parent().removeClass("ele_fixed_parent");
            $(ele).parent().css("margin-top", "0");
        }
    });

}

function scrollFixMarginDate(ele, offset) {
    var first = 1;
    var top = 0;
    var ele_width = 0;
    var ele_height = 0;
    $(window).scroll(function() {

        if (first) {
            top = $(ele).offset().top - offset;
            ele_width = $(ele).width();
            ele_height = $(ele).outerHeight();
            first = 0;
        }

        var current_top = $("body").scrollTop();
        if (current_top > top) {
            $(ele).css({ "position": "fixed", top: "0", "padding-top": "0", "width": "340px", "margin-top": offset, "z-index": "999" });
            $(ele).addClass("ele_fixed");
            $(ele).parent().addClass("ele_fixed_parent");
            $(ele).parent().css("margin-top", ele_height);
        } else {
            $(ele).css({ "position": "relative", top: "auto", "margin-top": "0" });
            $(ele).removeClass("ele_fixed");
            $(ele).parent().removeClass("ele_fixed_parent");
            $(ele).parent().css("margin-top", "0");
        }
    });

}


$(function() {

    if (!('placeholder' in document.createElement('input'))) {

        $('input[placeholder],textarea[placeholder]').each(function() {
            var that = $(this),
                text = that.attr('placeholder');
            if (that.val() === "") {
                that.val(text).addClass('placeholder');
            }
            that.focus(function() {
                    if (that.val() === text) {
                        that.val("").removeClass('placeholder');
                    }
                })
                .blur(function() {
                    if (that.val() === "") {
                        that.val(text).addClass('placeholder');
                    }
                })
                .closest('form').submit(function() {
                    if (that.val() === text) {
                        that.val('');
                    }
                });
        });
    }




    $(window).scroll("body", function() {
        var w1 = $(".employees .form-wrap").width();
        if ($("body").scrollTop() >= 253) {
            $(".employees:not(.mass-edit,.employees-import) .form-wrap").css({ "position": "fixed", "top": 0, "width": w1 });
        } else {
            $(".employees:not(.mass-edit,.employees-import) .form-wrap").css({ "position": "relative", "width": "auto" });
        }

        if ($("body.mass-edit").scrollTop() >= 157) {
            $(".employees .content-header").css({ "position": "fixed", "top": 0, "width": 1050 });
            $(".content-wrap").css("padding-top", 98);
            $(".employees .form-wrap").css({ "position": "fixed", "top": 98, "width": 420 });
        } else if ($("body.mass-edit").scrollTop() < 157 && $("body.mass-edit").scrollTop() != null) {
            $(".employees .content-header").css({ "position": "relative", "width": "auto" });
            $(".content-wrap").css("padding-top", 0);
            $(".employees .form-wrap").css({ "position": "relative", "width": "auto", "top": 0 });
        }

    });



    $('.check').bind('click', function() {
        if (!$(this).closest("li").hasClass("disabled")) {
            if ($(this).hasClass("checked")) {
                $(this).find(".switch").animate({
                    left: "0"
                }, 200, function() {
                    $(this).closest(".check").removeClass("checked");
                    $(this).closest(".check").addClass("unchecked");
                });
            } else if ($(this).hasClass("unchecked")) {
                $(this).find(".switch").animate({
                    left: "35"
                }, 200, function() {
                    $(this).closest(".check").removeClass("unchecked");
                    $(this).closest(".check").addClass("checked");
                });
            }
        }
    });
    $(".check").click(function() {
        if (!$(this).closest("li").hasClass("disabled")) {
            if ($(this).hasClass("checked")) {
                $(this).find(".switch").animate({
                    left: "0"
                }, 200, function() {
                    $(this).closest(".check").removeClass("checked");
                    $(this).closest(".check").addClass("unchecked");
                });
            } else if ($(this).hasClass("unchecked")) {
                $(this).find(".switch").animate({
                    left: "35"
                }, 200, function() {
                    $(this).closest(".check").removeClass("unchecked");
                    $(this).closest(".check").addClass("checked");
                });
            }
        }
    });
    /*$(".navbar-nav").eq(0).find("li").eq(1).click(function(){
        if (parseInt(getCache('subAccount')) == 0) {
           window.location.href = 'emplist.html'
        } else {
            window.location.href = 'employees_all.html'
        }
    });*/
    setTimeout(function() {
        $(".alert").slideUp();
    }, 5000);

    $(window).scroll(function() {
        if ($("body").scrollTop() > 177) {
            $(".alert").addClass("alert-fixed");
        } else {
            $(".alert").removeClass("alert-fixed");
        }

    });



    // list tag
    $(window).scroll(function() {
        var g_oft = 0;
        if ($("body").hasClass("mass-edit")) {
            g_oft = 97;
        }
        var c_h = $("body").scrollTop();
        $(".employee-list li.section").removeClass("current");
        $(".employee-list li.section").each(function() {
            if (($(this).offset().top) - g_oft < c_h && ($(this).height() + $(this).offset().top) - g_oft > c_h) {
                $(this).addClass("current");
            }
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(".bar .help").click(function() {
        $('#help-modal').modal();
    });
    $(".versionrecord span.versionmessage").text(nowVersion);
    $(".versionrecord .versionmes").text(nowVersion);
    $(".versionrecord").click(function() {
        window.location.href = "history.html";
    });

    var topHeight = $(".branding").height();
    var bomHeight = $(".colophon").height() + parseInt($(".colophon").css("padding-top")) * 2;
    var pageHeight = vHeight - topHeight - bomHeight;
    $(".page-content").css({
        "height": "auto",
        "min-height": pageHeight + "px"
    });
    $(".copyyear").text(getCurYear());
});

function setRightModal() {
    var wheight = window.innerHeight;
    var rightBody = wheight - 50 - 70;
    $('.rightmodal-body').css({
        'height': rightBody + 'px',
        'overflow-y': 'scroll'
    });
}
/* 检测手机号 */
function checkPhoneNumber(phoneid) {
    var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (phoneReg.test(phoneid)) {
        return true;
    } else {
        return false;
    }
}
/*   检测身份证   */
function checkIdCard(idcard) {
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

function ajaxFunction(sendData, url, type, async, token, contentType) {
    var option = {
        "data": JSON.stringify(sendData),
        "url": url,
        "type": type,
        "async": async,
        "contentType": 'application/json'
    };

    var jqXHR = $.ajax(option);
    return jqXHR;
}